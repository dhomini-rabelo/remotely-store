from typing import Literal, TypedDict
import uuid


class IProductCart(TypedDict):
    id: str | uuid.UUID
    quantity: int


class ICart(TypedDict):
    products: list[IProductCart]
    payment_method: Literal['pix', 'card']
