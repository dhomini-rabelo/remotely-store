from pytest import fixture
from django.test import Client

from apps.accounts.app.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APIClient

AUTH_USER_EMAIL = 'test@test.com'
AUTH_USER_PASSWORD = 'TEST123'


@fixture
def auth_user():
    user = User(username=AUTH_USER_EMAIL, email=AUTH_USER_EMAIL)
    user.set_password(AUTH_USER_PASSWORD)
    user.save()
    return user


@fixture(scope='session')
def simple_client():
    return Client()


@fixture
def auth_client(auth_user):
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(RefreshToken.for_user(auth_user).access_token)}')
    return client
