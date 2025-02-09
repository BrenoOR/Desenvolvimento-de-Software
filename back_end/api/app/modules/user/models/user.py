"""Classes related to User."""

from datetime import datetime
from typing import List, Any
from pydantic import Field
from loguru import logger
from app.modules.utils import BaseModel, DefaultResponse
from app.modules.utils import generate_id


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
    )
    password: str = Field(
        None,
        title="Password",
        description="User password.",
        min_length=8,
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
        self.user_id = generate_id()
        self.is_active = self.is_active if self.is_active is not None else True
        self.is_superuser = (
            self.is_superuser if self.is_superuser is not None else False
        )
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def update(self, data: Any):
        for field in data:
            if hasattr(self, field) and data[field] is not None:
                setattr(self, field, data[field])
        self.updated_at = datetime.now()


class UserCreate(BaseModel):
    username: str = Field(
        None, title="Username", description="User name.", max_length=50
    )
    email: str = Field(
        None,
        title="Email",
        description="User email.",
    )
    password: str = Field(
        None,
        title="Password",
        description="User password.",
        min_length=8,
    )
    hyperfocuses: List[str] = Field(
        None, title="Hyperfocuses", description="User hyperfocuses IDs."
    )
    is_superuser: bool = Field(
        None, title="Superuser", description="User is superuser."
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __eq__(self, other: User):
        if self.username == other.username and self.email == other.email:
            return True
        return False


class UserPublic(BaseModel):
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
    )
    hyperfocuses: List[str] = Field(
        None, title="Hyperfocuses", description="User hyperfocuses IDs."
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __eq__(self, other: User):
        if self.user_id == other.user_id and self.email == other.email:
            return True
        return False


class UserResponse(DefaultResponse):
    message: UserPublic


class UsersResponse(DefaultResponse):
    message: List[UserPublic]
