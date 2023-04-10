from rest_framework.test import APIClient
from pytest import mark

from django.urls import reverse


@mark.django_db
class TestRegisterAPI:
    VALID_DATA = {"email": "test@email.com", "password": "null0000", "confirm_password": "null0000"}
    ROUTE = reverse('accounts:register')

    def test_api_with_empty_body(self, simple_client: APIClient):
        response = simple_client.post(
            self.ROUTE,
            {},
        )
        assert response.status_code == 400

    def test_api_without_email(self, simple_client: APIClient):
        data = {k: v for k, v in self.VALID_DATA.items() if k != 'email'}
        response = simple_client.post(
            self.ROUTE,
            data,
        )
        assert response.data['email'][0].code == 'required'

    def test_api_without_password(self, simple_client: APIClient):
        data = {k: v for k, v in self.VALID_DATA.items() if k != 'password'}
        response = simple_client.post(
            self.ROUTE,
            data,
        )
        assert response.data['password'][0].code == 'required'

    def test_api_without_confirm_password(self, simple_client: APIClient):
        data = {k: v for k, v in self.VALID_DATA.items() if k != 'confirm_password'}
        response = simple_client.post(
            self.ROUTE,
            data,
        )
        assert response.data['confirm_password'][0].code == 'required'

    def test_api_with_different_passwords(self, simple_client: APIClient):
        data = {**self.VALID_DATA, 'confirm_password': 'DIFFERENT_PASSWORD'}
        response = simple_client.post(
            self.ROUTE,
            data,
        )
        assert response.data['confirm_password'][0].code == 'different_passwords'

    def test_api_when_success(self, simple_client: APIClient):
        response = simple_client.post(
            self.ROUTE,
            self.VALID_DATA,
        )
        assert response.status_code == 201

    def test_api_unique_email_error(self, simple_client: APIClient):
        first_response = simple_client.post(
            self.ROUTE,
            self.VALID_DATA,
        )
        second_response = simple_client.post(
            self.ROUTE,
            self.VALID_DATA,
        )
        assert first_response.status_code == 201 and second_response.data['email'][0].code == 'unique_email'
