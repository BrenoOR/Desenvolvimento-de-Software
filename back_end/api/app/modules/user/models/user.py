"""Classes related to User."""

from datetime import datetime
from typing import List
from pydantic import Field
from loguru import logger
from modules.utils import BaseModel
from modules.utils import generate_id


class User(BaseModel):
    """User model."""

    user_id: str = Field(
        None,
        title="User ID",
        description="Unique user ID.",
    )
    username: str = Field(
        None, title="Username", description="User name.", max_length=50
    )
    email: str = Field(
        None,
        title="Email",
        description="User email.",
#        pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+",
    )
    password: str = Field(
        None,
        title="Password",
        description="User password.",
        min_length=8,
#        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,}$",
    )
    hyperfocuses: List[str] = Field(
        None, title="Hyperfocuses", description="User hyperfocuses IDs."
    )
    is_active: bool = Field(None, title="Active", description="User is active.")
    is_superuser: bool = Field(
        None, title="Superuser", description="User is superuser."
    )
    created_at: datetime = Field(
        None, title="Created at", description="User creation date."
    )
    updated_at: datetime = Field(
        None, title="Updated at", description="User update date."
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        logger.info(f"Creating User with data: {self.dict()}")
        self.user_id = generate_id()
        logger.info(f"User ID: {self.user_id}")
        self.is_active = self.is_active if self.is_active is not None else True
        self.is_superuser = (
            self.is_superuser if self.is_superuser is not None else False
        )

class UserResponse(BaseModel):
    user_id: str = Field(
        None,
        title="User ID",
        description="Unique user ID.",
    )
    username: str = Field(
        None, title="Username", description="User name.", max_length=50
    )
    email: str = Field(
        None,
        title="Email",
        description="User email.",
#        pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+",
    )
    hyperfocuses: List[str] = Field(
        None, title="Hyperfocuses", description="User hyperfocuses IDs."
    )
    

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        