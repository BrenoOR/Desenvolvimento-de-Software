import os
import pytest
from fastapi.testclient import TestClient
from app.main import app

env = os.environ["ENVIRONMENT"]


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def base_url():
    return f"/{env}/v1"
