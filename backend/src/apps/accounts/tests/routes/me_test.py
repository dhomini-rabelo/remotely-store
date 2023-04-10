from rest_framework.test import APIClient
from pytest import mark

from django.urls import reverse


@mark.django_db
class TestMeAPI:
    ROUTE = reverse('accounts:me')

    def test_api_with_simple_user(self, simple_client: APIClient):
        response = simple_client.get(
            self.ROUTE,
        )
        assert response.status_code == 401

    def test_api_with_auth_user(self, auth_client: APIClient):
        response = auth_client.get(
            self.ROUTE,
        )
        assert response.status_code == 200
