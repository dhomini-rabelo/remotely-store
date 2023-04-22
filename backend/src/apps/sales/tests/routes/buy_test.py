from functools import reduce
import json
from typing import TypedDict
from django.db.models import QuerySet
from rest_framework.test import APIClient
from pytest import fixture, mark

from django.urls import reverse
from Core.forms.errors import ErrorMessages
from apps.sales.actions.services.Buy.typings import ICart, IProductCart
from apps.sales.app.models.products import Product, Price
from apps.sales.app.models.sales import Sale


@fixture
def products():
    def create_product(index):
        product = Product.objects.create(
            name=f'test{index}',
            image='',
            department=None,
            provider=None,
        )
        Price.objects.create(
            value=1000 * index,
            product=product,
        )
        return product

    return list(map(create_product, range(1, 5 + 1)))


@mark.django_db
class TestBuyAPI:
    ROUTE = reverse('sales:buy')

    def test_api_with_simple_user(self, simple_client: APIClient):
        response = simple_client.post(self.ROUTE, {})
        assert response.status_code == 401

    def test_api_with_empty_cart(self, auth_client: APIClient):
        response = auth_client.post(self.ROUTE, {'products': [], 'payment_method': 'pix'})
        assert response.data['products'][0].code == 'required'

    def test_api_with_invalid_payment_method(self, auth_client: APIClient):
        response = auth_client.post(self.ROUTE, {'products': [], 'payment_method': 'INVALID'})
        assert response.data['payment_method'][0].code == 'invalid_choice'

    def test_api_with_invalid_products_field(self, auth_client: APIClient, products: list[Product]):
        data = {
            'products': [{} for index in range(5)],
            'payment_method': 'pix',
        }
        response = auth_client.post(self.ROUTE, data=json.dumps(data), content_type='application/json')
        assert all(
            [
                (product['id'][0].code == 'required' and product['quantity'][0].code == 'required')
                for product in response.data['products']
            ]
        )

    def test_api_with_invalid_product_id(self, auth_client: APIClient, products: list[Product]):
        data = {
            'products': [
                {
                    'id': str(product.id)[1:10],
                    'quantity': 1,
                }
                for product in products
            ],
            'payment_method': 'pix',
        }
        response = auth_client.post(self.ROUTE, data=json.dumps(data), content_type='application/json')
        assert all([(product['id'][0].code == 'invalid') for product in response.data['products']])

    def test_api_with_invalid_product_quantity(self, auth_client: APIClient, products: list[Product]):
        data = {
            'products': [
                {
                    'id': str(product.id),
                    'quantity': 'x',
                }
                for product in products
            ],
            'payment_method': 'pix',
        }
        response = auth_client.post(self.ROUTE, data=json.dumps(data), content_type='application/json')
        assert all([(product['quantity'][0].code == 'invalid') for product in response.data['products']])

    def test_api_with_empty_product_quantity(self, auth_client: APIClient, products: list[Product]):
        data = {
            'products': [
                {
                    'id': str(product.id),
                    'quantity': 0,
                }
                for product in products
            ],
            'payment_method': 'pix',
        }
        response = auth_client.post(self.ROUTE, data=json.dumps(data), content_type='application/json')
        assert all(
            [(str(product['quantity'][0]) == 'Informe um número positivo') for product in response.data['products']]
        )

    def test_duplicated_product_in_the_cart(self, auth_client: APIClient, products: list[Product]):
        data = {
            'products': [
                *[
                    {
                        'id': str(product.id),
                        'quantity': index + 2,
                    }
                    for index, product in enumerate(products)
                ],
                {
                    'id': str(products[0].id),
                    'quantity': 1,
                },
            ],
            'payment_method': 'pix',
        }
        response = auth_client.post(self.ROUTE, data=json.dumps(data), content_type='application/json')
        assert response.data['products'][0].code == ErrorMessages.DUPLICATED_PRODUCT_IN_THE_CART.code

    def test_api_success_case(self, auth_client: APIClient, products: QuerySet[Product]):
        def sum_price(accumulator: int, product_data: IProductCart) -> int:
            product = Product.objects.get(id=product_data.get('id'))
            price = product.manager.get_active_price()
            return ((price.promotional_value or price.value) * product_data['quantity']) + accumulator

        data: ICart = {
            'products': [
                {
                    'id': str(product.id),
                    'quantity': index + 2,
                }
                for index, product in enumerate(products)
            ],
            'payment_method': 'pix',
        }
        response = auth_client.post(self.ROUTE, data=json.dumps(data), content_type='application/json')
        assert response.status_code == 200 and Sale.objects.first().total_value == reduce(
            sum_price, data['products'], 0
        )
