import os
import logging

from server.constants import (
    SECRET_GEMINI,
    SECRET_MODEL,
)
from server.utils import get_secret

from google import genai
from google.genai import types

logger = logging.getLogger()


class GeminiService:
    """Class representing the Gemini AI service."""

    client: genai.Client = None
    chats: dict = {}

    def config(self):
        """Configures the Gemini AI service."""
        self.client = genai.Client(api_key=get_secret(SECRET_GEMINI))

    def get_model(self, user_id: str):
        """Returns the generative model to be used for the AI service."""
        if self.client is None:
            raise Exception("Client not configured.")
        if not self.chats.get(user_id):
            self.chats[user_id] = self.client.chats.create(
                model=get_secret(SECRET_MODEL)
            )
        return self.chats[user_id]

    def get_user_session(self, user_id: str):
        """Gets the user session."""
        chat = self.get_model(user_id=user_id)
        return chat

    def process_request(self, body: str, user_id: str):
        """Processes the request to the AI service."""
        logger.info("Processing request...")
        logger.info(f"Body: {body}")
        response = self.get_model(user_id=user_id).send_message(body).text
        return response

    def get_history(self, user_id: str):
        """Gets the history of the user."""
        chat = self.get_user_session(user_id=user_id)
        history = [message.model_dump() for message in chat._curated_history]
        logger.info(f"History: {history}")
        return history

    def set_history(self, user_id: str, history: list):
        """Sets the history of the user."""
        if self.client is None:
            raise Exception("Client not configured.")
        hist = [
            types.Content(parts=message["parts"], role=message["role"])
            for message in history
        ]
        logger.info(f"History size: {len(hist)}")
        if not self.chats.get(user_id):
            logger.info(f"Loading history of user {user_id}")
            self.chats[user_id] = self.client.chats.create(
                model=get_secret(SECRET_MODEL), history=hist
            )
        return self.chats

    def get_chats(self):
        """Gets the chats."""
        return self.chats
