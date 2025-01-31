import os
import sys
import time
import loguru
import uvicorn
from logging.config import fileConfig
from http.client import responses
from starlette.middleware.cors import CORSMiddleware
from starlette_prometheus import PrometheusMiddleware

from sqlalchemy.orm import Session

from fastapi import FastAPI, Request, Depends
from modules.user.db.db import get_db
from modules.router import router
from modules import utils

env = os.environ["ENVIRONMENT"]

app = FastAPI(
    title="Prisma API",
    description="API to control Prisma App basics.",
    version="0.1.0",
    openapi_url=f"/{env}/v1/openapi.json",
    docs_url=f"/{env}/v1/docs",
    redoc_url=f"/{env}/v1/redoc",
)

# fileConfig("./log.ini")
logger = loguru.logger
logger.remove()
logger.add(
    sys.stdout,
    colorize=True,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | Log Level={level} | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> | <yellow>ID={extra[request_id]}</yellow> | {message}",
    backtrace=True,
    diagnose=True,
    level="DEBUG",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(PrometheusMiddleware)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log requests."""
    start_time = time.time()
    request_id = utils.generate_id()
    with logger.contextualize(request_id=request_id):
        logger.info(f"Request received:")

        method = request.method
        url = request.url
        headers = request.headers
        path_params = request.path_params
        query_params = request.query_params

        logger.info(f"Request Method: {method}")
        logger.info(f"Request URL: {url}")
        logger.info(f"Request Headers Params: {headers}")
        logger.info(f"Request Path Params: {path_params}")
        logger.info(f"Request Query Params: {query_params}")

        response = await call_next(request)

        process_time = time.time() - start_time
        response.headers["X-Process-Time"] = str(process_time)
        response.headers["X-Request-ID"] = request_id
        logger.info(f"Process Time: {process_time}")
        logger.info(
            f"Request ended with: [{response.status_code}] {responses[response.status_code]}"
        )
        return response


@app.get(f"/{env}", tags=["Hello World"], summary="Hello World endpoint.")
def root(db: Session = Depends(get_db)):
    """Hello World endpoint."""
    return {"Hello": "World"}


app.include_router(router, prefix=f"/{env}/v1")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, timeout_keep_alive=10)
