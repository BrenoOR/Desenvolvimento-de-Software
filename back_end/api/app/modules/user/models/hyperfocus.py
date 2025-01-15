"""Classes related to Hyperfocus."""

from datetime import datetime
from typing import List
from pydantic import Field

from modules.utils import BaseModel
from modules.utils import generate_id


class HyperFocus(BaseModel):
    """Hyperfocus model."""

    id: str = Field(
        None,
        title="Hyperfocus ID",
        description="Unique hyperfocus ID.",
        default_factory=generate_id,
    )
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
    created_at: datetime = Field(
        None, title="Created at", description="Hyperfocus creation date."
    )
    updated_at: datetime = Field(
        None, title="Updated at", description="Hyperfocus update date."
    )
