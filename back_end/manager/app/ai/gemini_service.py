import os
import logging

from server.constants import (
    SECRET_GEMINI,
    SECRET_MODEL,
)
from server.utils import get_secret

import google.generativeai as genai

logger = logging.getLogger()

class GeminiService:
    """Class representing the Gemini AI service."""
    def config(self):
        """Configures the Gemini AI service."""
        genai.configure(api_key=get_secret(SECRET_GEMINI))

    def get_model(self) -> genai.GenerativeModel:
        """Returns the generative model to be used for the AI service."""
        return genai.GenerativeModel(model_name=get_secret(SECRET_MODEL))

    def process_request(self, body):
        """Processes the request to the AI service."""
        logger.info("Processing request...")
        logger.info(f"Body: {body}")
        response = self.get_model().generate_content(body).text
        return response
    