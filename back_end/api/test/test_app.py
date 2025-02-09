from http import HTTPStatus


def test_hello_world_should_return_hello_world(client, base_url):
    response = client.get(base_url)
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {"message": "Hello World"}
