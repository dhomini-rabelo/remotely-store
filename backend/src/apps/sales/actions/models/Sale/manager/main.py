from typing import Any
from apps.accounts.app.models import User
from apps.sales.actions.models.Sale.manager.serializers import ProductCartSerializer

from apps.sales.actions.models.Sale.manager.typings import ISaleBody

from rest_framework.serializers import ValidationError


if __name__ == '__main__':
    from apps.sales.app.models.sales import Sale


class SaleManager:
    def __init__(self, sale: 'Sale'):
        self.sale = sale

    def register_sale(self, sale_body: dict | ISaleBody, auth_user: User):
        products_cart_serializer = ProductCartSerializer(data=sale_body.get('products'), many=True)
        if products_cart_serializer.is_valid():
            ...
        else:
            raise ValidationError(products_cart_serializer.errors)
