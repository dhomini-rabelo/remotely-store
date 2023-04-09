from decimal import Decimal
from typing import Union

from apps.accounts.app.models import User


if __name__ == '__main__':
    from apps.sales.app.models.products import Product, Price


class ProductManager:
    def __init__(self, product: 'Product'):
        self.__product = product

    def get_active_price(self) -> Union['Price', None]:
        return self.__product.prices.filter(disabled_at=None).first()

    def get_price(self) -> int:
        active_price = self.get_active_price()
        return active_price.value if active_price else 0

    def update_price(self, price: Decimal, promocional_price: Decimal | None, user: User):
        active_price = self.get_active_price()
        if active_price:
            active_price.manager.disable(user)
        self.__product.prices.create(
            value=price,
            promotional_value=promocional_price,
        )
