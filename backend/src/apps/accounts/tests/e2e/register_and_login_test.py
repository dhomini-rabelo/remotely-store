from rest_framework.test import APIClient
from pytest import mark

from django.urls import reverse


@mark.django_db
class TestE2ERegisterAndLogin:
    VALID_DATA = {"email": "test@email.com", "password": "null0000", "confirm_password": "null0000"}
    REGISTER_ROUTE = reverse('accounts:register')
    LOGIN_ROUTE = reverse('accounts:login')

    def test_login_after_register(self, simple_client: APIClient):
        register_response = simple_client.post(
            self.REGISTER_ROUTE,
            self.VALID_DATA,
        )
        login_response = simple_client.post(
            self.LOGIN_ROUTE,
            {
                'username': self.VALID_DATA['email'],
                'password': self.VALID_DATA['password'],
            },
        )
        assert register_response.status_code == 201 and login_response.status_code == 200
