from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.exceptions import HTTPException
from jwt import encode, decode, DecodeError
from pwdlib import PasswordHash
from loguru import logger
from sqlalchemy.orm import Session
from starlette.status import HTTP_400_BAD_REQUEST

from app.modules.auth.models.auth import Token
from app.modules.user.db.schema import User as UserSchema

SECRET_KEY = "test"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = PasswordHash.recommended()


class AuthService:
    @staticmethod
    def create_access_token(data: dict):
        to_encode = data.copy()
        expire = datetime.now(ZoneInfo("UTC")) + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
        to_encode.update({"exp": expire})
        encoded_jwt = encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    @staticmethod
    def get_password_hash(password: str):
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str):
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def login(form: OAuth2PasswordRequestForm, db: Session):
        user = db.scalar(
            db.query(UserSchema).filter(UserSchema.username == form.username)
        )
        if not user:
            user = db.scalar(
                db.query(UserSchema).filter(UserSchema.email == form.username)
            )
        if not user:
            raise HTTPException(
                status_code=HTTP_400_BAD_REQUEST,
                detail="Incorrect username or password",
            )

        if not AuthService.verify_password(form.password, user.password):
            raise HTTPException(
                status_code=HTTP_400_BAD_REQUEST,
                detail="Incorrect username or password",
            )

        access_token = AuthService.create_access_token(data={"sub": user.email})
        return Token(access_token=access_token, token_type="bearer")


def check_token(token: str):
    try:
        payload = decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=HTTP_400_BAD_REQUEST, detail="Invalid token"
            )
    except Exception as exception:
        logger.error(f"Error: {exception}")
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Invalid token")
    return True


auth = OAuth2PasswordBearer(tokenUrl="auth/login")
