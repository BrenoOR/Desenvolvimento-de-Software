"""Classes and functions used in all modules."""

from sqlalchemy.orm import declarative_base
from typing import Any
from pydantic import BaseModel as Base, Field
from uuid import uuid4
from http import HTTPStatus as status
from fastapi import HTTPException

BaseDB = declarative_base()


def generate_id() -> str:
    """Generate unique ID."""
    return str(uuid4())


class BaseModel(Base):
    """Base class for all models."""

    def to_dict(self):
        """Convert model to dictionary."""
        return self.model_dump(mode="json")

    def to_json(self):
        """Convert model to JSON."""
        return self.model_dump_json()


class DefaultResponse(BaseModel):
    http_status: int
    message: Any


class DefaultErrorResponse(BaseModel):
    """Default error response."""

    http_status: int = Field(None, description="HTTP status code.")
    message: str = Field(None, description="Error message.")

    def error(self):
        """Return error message."""
        return HTTPException(
            status_code=self.http_status,
            detail={"http_status": self.http_status, "message": self.message},
        )


def format_error_response(error: Any) -> DefaultErrorResponse:
    """Format error response."""
    if hasattr(error, "status_code"):
        status_code = error.status_code
    elif hasattr(error, "code"):
        status_code = error.code
    else:
        status_code = status.INTERNAL_SERVER_ERROR

    if hasattr(error, "detail"):
        return DefaultErrorResponse(http_status=status_code, message=error.detail)
    else:
        return DefaultErrorResponse(http_status=status_code, message=str(error))
