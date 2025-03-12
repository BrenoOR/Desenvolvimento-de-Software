"""Classes related to Auth."""

from datetime import datetime
from typing import List, Any
from pydantic import Field
from loguru import logger
from app.modules.utils import BaseModel, DefaultResponse


class Token(BaseModel):
    """Auth model."""

    access_token: str = Field(
        None,
        title="Access token",
        description="User access token.",
    )
    token_type: str = Field(
        None,
        title="Token type",
        description="Token type.",
    )


class TokenResponse(DefaultResponse):
    message: Token
