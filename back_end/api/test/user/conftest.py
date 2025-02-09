import pytest
from app.modules.user.models.user import User, UserPublic

database_user = [
    User(
        username="user01",
        email="user01@teste.com.br",
        password="12345678",
        hyperfocuses=["1", "2"],
        is_superuser=False,
    ),
    User(
        username="user02",
        email="user02@teste.com.br",
        password="12345678",
        hyperfocuses=["1", "2"],
        is_superuser=False,
    ),
]


@pytest.fixture
def populate_user_table(client, base_url):
    db = client.get(f"{base_url}/users").json()["message"]
    index = 0
    for user in db:
        db[index] = UserPublic(**user)
        index += 1
    for user in database_user:
        client.post(f"{base_url}/users", json=user.to_dict())
        db.append(UserPublic(**user.to_dict()))

    return db


@pytest.fixture
def new_user():
    return User(
        username="Teste da Silva",
        email="test.silva@teste.com.br",
        password="12345678",
        hyperfocuses=["1", "2"],
        is_superuser=False,
    )
