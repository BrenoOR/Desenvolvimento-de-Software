"""Classes related to Hyperfocus."""

from datetime import datetime
from typing import List
from pydantic import Field

from app.modules.utils import BaseModel
from app.modules.utils import generate_id


class HyperFocus(BaseModel):
    """Hyperfocus model."""

    name: str = Field(None, title="Name", description="Hyperfocus name.", max_length=50)
    description: str = Field(
        None,
        title="Description",
        description="Hyperfocus description.",
        max_length=255,
    )
    tags: List[str] = Field(None, title="Tags", description="Hyperfocus tags.")
    users: List[str] = Field(
        None, title="Users", description="Users with this Hyperfocus."
    )
    related_hyperfocuses: List[str] = Field(
        None, title="Related Hyperfocuses", description="Related Hyperfocuses IDs."
    )
    created_at: datetime = Field(
        None, title="Created at", description="Hyperfocus creation date."
    )
    updated_at: datetime = Field(
        None, title="Updated at", description="Hyperfocus update date."
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.id = generate_id()
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def update(self, data: dict):
        for field in data:
            if hasattr(self, field) and data[field] is not None:
                setattr(self, field, data[field])
        self.updated_at = datetime.now()

    def add_related_hyperfocus(self, hyperfocus_id: str):
        if hyperfocus_id not in self.related_hyperfocuses:
            self.related_hyperfocuses.append(hyperfocus_id)
            self.updated_at = datetime.now()

    def remove_related_hyperfocus(self, hyperfocus_id: str):
        if hyperfocus_id in self.related_hyperfocuses:
            self.related_hyperfocuses.remove(hyperfocus_id)
            self.updated_at = datetime.now()

    def add_user(self, user_id: str):
        if user_id not in self.users:
            self.users.append(user_id)
            self.updated_at = datetime.now()

    def remove_user(self, user_id: str):
        if user_id in self.users:
            self.users.remove(user_id)
            self.updated_at = datetime.now()


class HyperFocusCreate(BaseModel):
    """Hyperfocus create model."""

    name: str = Field(None, title="Name", description="Hyperfocus name.", max_length=50)
    description: str = Field(
        None,
        title="Description",
        description="Hyperfocus description.",
        max_length=255,
    )
    tags: List[str] = Field(None, title="Tags", description="Hyperfocus tags.")
    users: List[str] = Field(
        None, title="Users", description="Users with this Hyperfocus."
    )
    related_hyperfocuses: List[str] = Field(
        None, title="Related Hyperfocuses", description="Related Hyperfocuses IDs."
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __eq__(self, other: HyperFocus):
        return self.name == other.name
