from rest_framework.test import APIClient
from pytest import mark

from django.urls import reverse


@mark.django_db
class TestHomeAPI:
    ROUTE = reverse('core:home/data')

    def test_api_with_simple_user(self, simple_client: APIClient):
        response = simple_client.get(
            self.ROUTE,
        )
        assert response.status_code == 200
