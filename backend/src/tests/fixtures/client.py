from rest_framework.test import APIClient
from pytest import fixture


@fixture(scope='session')
def simple_client():
    return APIClient()
