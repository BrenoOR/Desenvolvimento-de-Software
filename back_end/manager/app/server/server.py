import os
import time
import logging
from concurrent import futures
import grpc

from server.proto.message_pb2 import (
    RequestAIChat,
    AIResponse
)
from server.proto.message_pb2_grpc import (
    ChatManagerServicer,
    add_ChatManagerServicer_to_server
)

from ai.gemini_service import GeminiService

logger = logging.getLogger()

class RPCServer(ChatManagerServicer):
    """Class representing the RPC server for the ChatManager service."""
    gemini_service = None

    def __init__(self):
        self.gemini_service = GeminiService()
        self.gemini_service.config()

    def start(self):
        """Starts the RPC server."""
        start = time.time()
        server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
        
        add_ChatManagerServicer_to_server(self, server)
        # server.add_secure_port('[::]:50051', grpc.local_server_credentials())
        server.add_insecure_port(f"[::]:{os.getenv('PORT', 50051)}")
        server.start()
        logger.info("RPC server started in %s seconds.", time.time() - start)
        server.wait_for_termination()

    def ChatAI(self, request, context):
        """Method to handle the chat_ai RPC call."""
        logger.info(f"Received request from {request.user_id}.")
        start = time.time()
        body = self.generate_body(request)
        message = self.gemini_service.process_request(body)
        logger.info("Processed request in %s seconds.", time.time() - start)
        return AIResponse(message=message)
    
    def generate_body(self, request: RequestAIChat) -> str:
        """Generates the body of the request to be sent to the AI service."""
        prefix = f"Responda a mensagem como se fosse responder o usuário _{request.user_name}_({request.user_id}),"
        prefix += f" no contexto {request.context},"
        prefix += " nunca mencione o valor entre parênteses,"
        prefix += " não mencione o contexto, e considere o nome do usuário o valor entre _underscores_, excluindo as underscores."
        prefix += " A mensagem do usuário é:"
        return f"{prefix} {request.message}"
