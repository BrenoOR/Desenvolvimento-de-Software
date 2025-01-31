import os
from typing import List, Optional

from fastapi import APIRouter, Body, Depends, Query, HTTPException
from fastapi.responses import JSONResponse
from loguru import logger
from sqlalchemy.orm import Session

from modules.user.models.user import User, UserResponse
#from modules.user.models.hyperfocus import HyperFocus

database = []

router = APIRouter(
    tags=["User"],
    responses={
        404: {"description": "Not found"},
        500: {"description": "Internal Server Error"},
    },
)

env = os.environ["ENVIRONMENT"]

@router.post('')
def create_user(user: User):
    user = User(**user.to_dict())
    logger.info(f"Creating User with data: {user.dict()}")
    user_response = UserResponse(**user.to_dict())
    database.append(user)
    return {"UserResponse": user_response}
