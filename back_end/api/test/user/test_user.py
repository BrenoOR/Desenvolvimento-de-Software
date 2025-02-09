from http import HTTPStatus

from app.modules.user.models.user import UserResponse, UsersResponse
from test.user.conftest import populate_user_table


class TestUser:
    def test_list_should_return_ok_and_users(
        self, client, base_url, populate_user_table
    ):
        response = UsersResponse(**client.get(f"{base_url}/users").json())

        assert response.http_status == HTTPStatus.OK
        assert response.message == populate_user_table

    def test_create_should_return_created_and_user(self, client, base_url, new_user):
        response = UserResponse(
            **client.post(f"{base_url}/users", json=new_user.to_dict()).json()
        )

        assert response.http_status == HTTPStatus.CREATED

        assert response.message.username == "Teste da Silva"
        assert response.message.email == "test.silva@teste.com.br"
        assert response.message.hyperfocuses == ["1", "2"]

    def test_get_after_create_should_return_ok_and_include_new_user(
        self, client, base_url, populate_user_table
    ):
        response = client.get(f"{base_url}/users")

        assert response.status_code == HTTPStatus.OK
        assert response.json()["http_status"] == HTTPStatus.OK
        assert response.json()["message"] == populate_user_table
