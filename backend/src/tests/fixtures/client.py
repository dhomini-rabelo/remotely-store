from rest_framework.test import APIClient
from pytest import fixture

from apps.accounts.app.models import User

AUTH_USER_EMAIL = 'test@test.com'
AUTH_USER_PASSWORD = 'TEST123'


@fixture
def create_auth_user():
    user = User(username=AUTH_USER_EMAIL, email=AUTH_USER_EMAIL)
    user.set_password(AUTH_USER_PASSWORD)
    user.save()


@fixture(scope='session')
def simple_client():
    return APIClient()
