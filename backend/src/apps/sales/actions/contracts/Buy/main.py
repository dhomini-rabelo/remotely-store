from functools import reduce
from typing import Any
from apps.accounts.app.models import User
from rest_framework import serializers

from apps.sales.actions.contracts.Buy.serializers import (
    BodyBuySerializer,
    ProductSoldBuySerializer,
    SaleBuySerializer,
)

from apps.sales.actions.contracts.Buy.typings import ICart

from rest_framework.serializers import ValidationError
from apps.sales.app.models.products import Product

from apps.sales.app.models.support.choices import SaleStatusChoices


class BuyAction:
    def __validate_args(self, body: Any, auth_user: User):
        if not (isinstance(body, dict) and isinstance(auth_user, User)):
            raise ValidationError({'message': ['Dados inválidos']})

    def __clean(self, body: Any, auth_user: User) -> ICart:
        self.__validate_args(body, auth_user)
        serializer = BodyBuySerializer(data=body)
        if not serializer.is_valid():
            raise serializers.ValidationError(serializer.errors)
        return serializer.data

    def run(self, body: Any | ICart, auth_user: User) -> str:
        cart_body = self.__clean(body, auth_user)
        products_sold_data = [
            {
                'product': product['id'],
                'quantity': product['quantity'],
                'price': Product.objects.get(id=product['id']).get_price() * product['quantity'],
            }
            for product in cart_body['products']
        ]
        sale_serializer = SaleBuySerializer(
            data={
                'client': str(auth_user.id),
                'status': SaleStatusChoices.IN_ANALYSIS,
                'delivery_fee': 0,
                'payment_method': cart_body['payment_method'],
                'total_value': reduce(lambda acc, product_sold: acc + product_sold['price'], products_sold_data, 0),
            }
        )
        if not sale_serializer.is_valid():
            raise serializers.ValidationError(sale_serializer.errors)
        else:
            sale_serializer.save()
            products_sold_serializer = ProductSoldBuySerializer(
                data=list(
                    map(
                        lambda product_sold_data: {**product_sold_data, 'sale': sale_serializer.data['id']},
                        products_sold_data,
                    )
                ),
                many=True,
            )
            if not products_sold_serializer.is_valid():
                raise serializers.ValidationError(products_sold_serializer.errors)
            else:
                products_sold_serializer.save()
            return str(sale_serializer.data['id']).split('-')[-1]
