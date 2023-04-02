from typing import Any
from apps.accounts.app.models import User
from apps.sales.actions.contracts.Buy.serializers import ProductCartSerializer

from apps.sales.actions.contracts.Buy.typings import ISaleBody

from rest_framework.serializers import ValidationError


if __name__ == '__main__':
    from apps.sales.app.models.sales import Sale


class BuyAction:
    def __validate_args(self, sale_body: dict | ISaleBody, auth_user: User):
        if not (isinstance(sale_body, dict) and isinstance(auth_user, User)):
            raise ValidationError({'message': ['Dados inválidos']})

    def run(self, sale_body: dict | ISaleBody, auth_user: User):
        self.__validate_args(sale_body, auth_user)
        products_cart = sale_body.get('products') or []
        products_cart_serializer = ProductCartSerializer(data=products_cart, many=True)
        if len(products_cart) == 0:
            raise ValidationError({'products': ['Carrinho vazio']})
        elif not products_cart_serializer.is_valid():
            raise ValidationError(products_cart_serializer.errors)
        else:
            pass
