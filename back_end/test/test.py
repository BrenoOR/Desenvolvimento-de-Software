import uuid
import time

import grpc

from protos.message_pb2 import RequestAIChat, AIResponse
from protos.message_pb2_grpc import ChatManagerStub

class RPCClient:
    def __init__(self, user_name: str = "User", context: str = "default"):
        self.user = RequestAIChat(user_name=user_name, user_id=str(uuid.uuid4()), context=context, message="")
        self.channel = grpc.insecure_channel('localhost:50051')

    def connect(self) -> ChatManagerStub:
        stub = ChatManagerStub(self.channel)
        return stub
    
    def call(self, stub: ChatManagerStub, body: RequestAIChat) -> AIResponse:
        response = stub.ChatAI(body)
        return response
    
user_name = input("Digite seu nome: ")
client = RPCClient(user_name=user_name)
connection = client.connect()
while True:
    chat = input(f"{user_name}: ")

    client.user.message = chat
    response = client.call(connection, client.user)
    
    print(f"Gemini: {response.message}")
    client.user.context += f"[{time.time()}][User]: {chat}.\n"
    client.user.context += f"[{time.time()}][Gemini]: {response.message}.\n"
    # print(f"Gemini: {response}")
