import os
import logging

from server.constants import SECRET_DATASTORE
from server.utils import get_secret

from google.cloud import datastore

logger = logging.getLogger()


class DatastoreService:
    """Class representing the Datastore service."""

    def __init__(self):
        self.client = datastore.Client(database=SECRET_DATASTORE)

    def get_user(self, user_id: str):
        """Gets the user from the Datastore."""
        key = self.client.key("user", user_id)
        user = self.client.get(key)
        if user is None:
            self.create_user({"user_id": user_id, "history": []})
            user = self.client.get(key)
        return user

    def create_user(self, user: dict):
        """Creates a user in the Datastore."""
        key = self.client.key("user", user["user_id"])
        entity = datastore.Entity(key=key)
        entity.update(user)
        self.client.put(entity)
        return entity

    def list_users(self):
        """Lists the users from the Datastore."""
        query = self.client.query(kind="user")
        users = list(query.fetch())
        return users

    def save_history(self, user_id: str, history: list):
        """Saves the history of the user."""
        key = self.client.key("user", user_id)
        user = self.client.get(key)
        if user is None:
            raise Exception("User not found.")
        user.update({"history": history})
        self.client.put(user)
        return user

    def user_exists(self, user_id: str):
        """Checks if the user exists."""
        logger.info(f"Checking if user exists: {user_id}")
        key = self.client.key("user", user_id)
        user = self.client.get(key)
        return user is not None
