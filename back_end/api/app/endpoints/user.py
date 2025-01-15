import os
from typing import List, Optional

from fastapi import APIRouter, Body, Depends, Query, HTTPException
from fastapi.responses import JSONResponse
from loguru import logger
from sqlalchemy.orm import Session

from app.modules.user.models.user import User
from app.modules.user.models.hyperfocus import HyperFocus

router = APIRouter(
    tags=["User"],
    responses={
        404: {"description": "Not found"},
        500: {"description": "Internal Server Error"},
    },
)

env = os.environ["ENVIRONMENT"]

@router.get(
    "",
    response_model=List[User],
    summary="Get all users",
)
