import os
from typing import List, Optional


from fastapi import APIRouter, Body, Depends, Query, Path, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from http import HTTPStatus
from loguru import logger
from sqlalchemy.orm import Session

from app.modules.auth.models.auth import TokenResponse
from app.modules.auth.services.auth_service import AuthService
from app.modules.user.db.db import get_session as get_user_db
from app.modules.utils import DefaultErrorResponse, format_error_response

router = APIRouter(
    tags=["Auth"],
    responses={
        HTTPStatus.BAD_REQUEST: {"model": DefaultErrorResponse},
        HTTPStatus.NOT_FOUND: {"model": DefaultErrorResponse},
        HTTPStatus.INTERNAL_SERVER_ERROR: {"model": DefaultErrorResponse},
    },
)

env = os.environ["ENVIRONMENT"]


@router.post(
    "/login",
    responses={
        HTTPStatus.OK: {"model": TokenResponse},
    },
)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_user_db),
):
    try:
        token = AuthService.login(form_data, db)
    except Exception as exception:
        exception = format_error_response(exception)
        logger.error(f"Error: {exception}")
        raise exception.error()
    return {"http_status": HTTPStatus.OK, "message": token}
