from google.cloud import secretmanager
from server.constants import PROJECT_ID


def get_secret(secret_name: str):
    client = secretmanager.SecretManagerServiceClient()
    name = client.secret_path(PROJECT_ID, secret_name)
    secret = client.access_secret_version(request={"name": f"{name}/versions/latest"})
    return secret.payload.data.decode("UTF-8")
