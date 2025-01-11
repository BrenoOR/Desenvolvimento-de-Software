from fastapi import FastAPI
from endpoints.router import router

app = FastAPI()


@app.get("/", tags=["Hello World"], summary="Hello World endpoint.")
def root():
    """Hello World endpoint."""
    return {"Hello": "World"}


app.include_router(router)
