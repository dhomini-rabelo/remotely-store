from django.test import Client
from pytest import fixture, mark

from apps.accounts.app.models import User
from django.urls import reverse


@fixture
@mark.django_db
def create_auth_user():
    user = User(username=TestLoginAPI.EMAIL, email=TestLoginAPI.EMAIL)
    user.set_password(TestLoginAPI.PASSWORD)
    user.save()


@mark.django_db
@mark.usefixtures("create_auth_user")
class TestLoginAPI:
    EMAIL = 'test@test.com'
    PASSWORD = 'TEST123'
    ROUTE = reverse('accounts:login')

    def test_login_with_empty_body(self, simple_client: Client):
        response = simple_client.post(
            self.ROUTE,
            {},
        )
        assert response.status_code == 400

    def test_login_without_password(self, simple_client: Client):
        response = simple_client.post(
            self.ROUTE,
            {
                'username': self.EMAIL,
            },
        )
        assert response.status_code == 400

    def test_login_without_username(self, simple_client: Client):
        response = simple_client.post(
            self.ROUTE,
            {
                'password': self.PASSWORD,
            },
        )
        assert response.status_code == 400

    def test_login_with_invalid_password(self, simple_client: Client):
        response = simple_client.post(
            self.ROUTE,
            {
                'username': self.EMAIL,
                'password': 'INVALID_PASSWORD',
            },
        )
        assert response.status_code == 401

    def test_login_with_invalid_email(self, simple_client: Client):
        response = simple_client.post(
            self.ROUTE,
            {
                'username': 'INVALID_EMAIL',
                'password': self.PASSWORD,
            },
        )
        assert response.status_code == 401

    def test_login_when_success(self, simple_client: Client):
        response = simple_client.post(
            self.ROUTE,
            {
                'username': self.EMAIL,
                'password': self.PASSWORD,
            },
        )
        assert response.status_code == 200
