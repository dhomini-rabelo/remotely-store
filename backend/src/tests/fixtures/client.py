from pytest import fixture
from django.test import Client

from apps.accounts.app.models import User
from rest_framework_simplejwt.tokens import RefreshToken

AUTH_USER_EMAIL = 'test@test.com'
AUTH_USER_PASSWORD = 'TEST123'


@fixture
def create_auth_user():
    user = User(username=AUTH_USER_EMAIL, email=AUTH_USER_EMAIL)
    user.set_password(AUTH_USER_PASSWORD)
    user.save()
    return user


@fixture(scope='session')
def simple_client():
    return Client()


@fixture
def auth_token(create_auth_user):
    return f'Bearer {str(RefreshToken.for_user(create_auth_user).access_token)}'
