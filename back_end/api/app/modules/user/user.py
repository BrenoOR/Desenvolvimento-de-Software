import os
from typing import List, Optional

from fastapi import APIRouter, Body, Depends, Query, HTTPException
from fastapi.responses import JSONResponse
from http import HTTPStatus
from loguru import logger
from sqlalchemy.orm import Session

from app.modules.user.db.db import get_session as get_user_db
from app.modules.user.models.user import (
    UserCreate,
    UserResponse,
    UsersResponse,
)
from app.modules.user.services.user_service import UserService
from app.modules.utils import DefaultErrorResponse, format_error_response

# from modules.user.models.hyperfocus import HyperFocus

router = APIRouter(
    tags=["User"],
    responses={
        HTTPStatus.BAD_REQUEST: {"model": DefaultErrorResponse},
        HTTPStatus.NOT_FOUND: {"model": DefaultErrorResponse},
        HTTPStatus.INTERNAL_SERVER_ERROR: {"model": DefaultErrorResponse},
    },
)

env = os.environ["ENVIRONMENT"]


@router.get(
    "",
    response_model=UsersResponse,
)
def list_users(
    max_results: int = Query(20, description="Max results to return"),
    page_number: int = Query(1, description="Page number to return"),
    user_db: Session = Depends(get_user_db),
):
    try:
        users = UserService.list_users(
            max_results=max_results, page_number=page_number, db=user_db
        )
    except Exception as exception:
        exception = format_error_response(exception)
        logger.error(f"Error: {exception}")
        raise exception.error()
    return {"http_status": HTTPStatus.OK, "message": users}


@router.post(
    "",
    responses={
        HTTPStatus.CREATED: {"model": UserResponse},
    },
)
def create_user(user: UserCreate, user_db: Session = Depends(get_user_db)):
    try:
        user_response = UserService.create_user(user=user, db=user_db)
    except Exception as exception:
        exception = format_error_response(exception)
        logger.error(f"Error: {exception}")
        raise exception.error()
    return {"http_status": HTTPStatus.CREATED, "message": user_response}


@router.get(
    "",
)
def get_user(
    user_id: str = Query(..., description="User ID."),
    user_db: Session = Depends(get_user_db),
):
    try:
        user_response = UserService.get_user(user_id=user_id, db=user_db)
    except Exception as exception:
        exception = format_error_response(exception)
        logger.error(f"Error: {exception}")
        raise exception.error()
    return {"http_status": HTTPStatus.OK, "message": user_response}


@router.put(
    "",
)
def update_user(
    user: UserCreate,
    user_id: str = Query(..., description="User ID."),
    user_db: Session = Depends(get_user_db),
):
    try:
        user_response = UserService.update_user(
            user_id=user_id, user_update=user, db=user_db
        )
    except Exception as exception:
        exception = format_error_response(exception)
        logger.error(f"Error: {exception}")
        raise exception.error()
    return {"http_status": HTTPStatus.OK, "message": user_response}


@router.delete(
    "",
)
def delete_user(
    user_id: str = Query(..., description="User ID."),
    user_db: Session = Depends(get_user_db),
):
    try:
        user_response = UserService.delete_user(user_id=user_id, db=user_db)
    except Exception as exception:
        exception = format_error_response(exception)
        logger.error(f"Error: {exception}")
        raise exception.error()
    return {"http_status": HTTPStatus.OK, "message": user_response}
