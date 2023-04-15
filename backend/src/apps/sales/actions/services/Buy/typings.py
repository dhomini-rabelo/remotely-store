from typing import Literal, TypedDict
import uuid

from apps.sales.app.models.products import Product


class IProductCart(TypedDict):
    id: str | uuid.UUID
    quantity: int


class ICart(TypedDict):
    products: list[IProductCart]
    payment_method: Literal['pix', 'card']


class IValidatedProductCart(TypedDict):
    product: Product
    quantity: int
