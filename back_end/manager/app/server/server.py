import os
import time
import json
import logging
import threading
from concurrent import futures

import grpc
from grpc_health.v1 import health, health_pb2, health_pb2_grpc
from py_grpc_prometheus.prometheus_server_interceptor import (
    PromServerInterceptor,
)
from prometheus_client import start_http_server

from server.proto.message_pb2 import RequestAIChat, AIResponse
from server.proto.message_pb2_grpc import (
    ChatManagerServicer,
    add_ChatManagerServicer_to_server,
)

from ai.gemini_service import GeminiService
from db.datastore_service import DatastoreService

_ONE_DAY_IN_SECONDS = 60 * 60 * 24
logger = logging.getLogger()


class RPCServer(ChatManagerServicer):
    """Class representing the RPC server for the ChatManager service."""

    def __init__(self):
        self.gemini_service = GeminiService()
        self.gemini_service.config()
        # Novo: Dicionário para armazenar o histórico de cada usuário
        self.user_sessions = {}  # {user_id: [mensagens]}
        self.datastore_service = DatastoreService()

    def start(self):
        """Starts the RPC server."""
        start = time.time()
        server = grpc.server(
            futures.ThreadPoolExecutor(),
            interceptors=(PromServerInterceptor(),),
        )

        add_ChatManagerServicer_to_server(self, server)
        server.add_insecure_port(f"[::]:{os.getenv('PORT', 50051)}")
        server.start()
        start_http_server(50080)
        logger.info("RPC server started in %s seconds.", time.time() - start)
        server.wait_for_termination()

    def ChatAI(self, request, context):
        """Method to handle the chat_ai RPC call."""
        logger.info(f"Received request from {request.user_id}.")
        start = time.time()

        # Novo: Obter ou criar sessão para o usuário
        # if request.user_id not in self.user_sessions:
        #     self.user_sessions[request.user_id] = []

        if self.datastore_service.user_exists(request.user_id):
            logger.info("User exists.")
            self.load_context(request.user_id)
        else:
            logger.info("User does not exist.")
            self.datastore_service.create_user(
                {"user_id": request.user_id, "history": []}
            )

        # Novo: Adicionar a mensagem atual ao histórico do usuário
        # self.user_sessions[request.user_id].append(
        #     {"role": "user", "content": request.message}
        # )

        # Alterado: Passar o histórico da sessão para generate_body
        body = self.generate_body(request)
        message = self.gemini_service.process_request(body, request.user_id)

        # Novo: Adicionar a resposta da IA ao histórico
        # self.user_sessions[request.user_id].append(
        #     {"role": "assistant", "content": message}
        # )
        self.save_context(request.user_id)

        logger.info("Processed request in %s seconds.", time.time() - start)
        return AIResponse(message=message)

    def generate_body(self, request: RequestAIChat) -> str:
        """Generates the body of the request to be sent to the AI service."""
        body = ""
        if len(self.gemini_service.get_history(request.user_id)) == 0:
            body = f"Responda a mensagem como se fosse responder o usuário _{request.user_name}_,"
            body += " nunca mencione o valor entre parênteses,"
            body += " não mencione o contexto, e considere o nome do usuário o valor entre _underscores_, excluindo as underscores.\n"

        body = body + request.message
        # # Novo: Construir o corpo com o histórico da sessão
        # body = prefix + "\nHistórico da conversa:\n"
        # for msg in session_history:
        #     body += f"{msg['role']}: {msg['content']}\n"

        return body

    def save_context(self, user_id: str):
        """Saves the context of the user."""
        history = self.gemini_service.get_history(user_id)
        self.datastore_service.save_history(user_id, history)

    def load_context(self, user_id: str):
        """Loads the context of the user."""
        history = json.loads(
            json.dumps(self.datastore_service.get_user(user_id)["history"]),
            parse_int=str,
        )
        logger.info(f"Loading context for {user_id}: {history}")
        chats = self.gemini_service.set_history(user_id=user_id, history=history)
        logger.info(f"Loaded context for {user_id}: {chats}")
        logger.info(f"History: {self.gemini_service.get_history(user_id)}")
