from typing import Literal, TypedDict


class IProductCart(TypedDict):
    id: str
    quantity: int


class ISaleBody(TypedDict):
    products: list[IProductCart]
    payment_type: Literal['pix', 'card']
