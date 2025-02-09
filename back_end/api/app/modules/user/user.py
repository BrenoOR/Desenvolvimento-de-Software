import os
from typing import List, Optional

from fastapi import APIRouter, Body, Depends, Query, HTTPException
from fastapi.responses import JSONResponse
from http import HTTPStatus
from loguru import logger
from sqlalchemy.orm import Session

from app.modules.user.models.user import (
    User,
    UserCreate,
    UserPublic,
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
def list_users():
    try:
        users = UserService.list_users()
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
def create_user(user: UserCreate):
    try:
        user_response = UserService.create_user(user)
    except Exception as exception:
        exception = format_error_response(exception)
        logger.error(f"Error: {exception}")
        raise exception.error()
    return {"http_status": HTTPStatus.CREATED, "message": user_response}


@router.get(
    "/{user_id}",
)
def get_user(user_id: str):
    try:
        user_response = UserService.get_user(user_id)
    except Exception as exception:
        exception = format_error_response(exception)
        logger.error(f"Error: {exception}")
        raise exception.error()
    return {"http_status": HTTPStatus.OK, "message": user_response}


@router.put(
    "/{user_id}",
)
def update_user(user_id: str, user: UserCreate):
    try:
        user_response = UserService.update_user(user_id, user)
    except Exception as exception:
        exception = format_error_response(exception)
        logger.error(f"Error: {exception}")
        raise exception.error()
    return {"http_status": HTTPStatus.OK, "message": user_response}


@router.delete(
    "/{user_id}",
)
def delete_user(user_id: str):
    try:
        user_response = UserService.delete_user(user_id)
    except Exception as exception:
        exception = format_error_response(exception)
        logger.error(f"Error: {exception}")
        raise exception.error()
    return {"http_status": HTTPStatus.OK, "message": user_response}
