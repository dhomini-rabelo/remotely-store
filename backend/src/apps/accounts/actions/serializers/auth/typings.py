from typing import TypedDict


class CreateUserRequestBodyType(TypedDict):
    username: str | None
    password: str | None
    confirm_password: str | None


class CreateUserValidatedDataType(TypedDict):
    email: str
    password: str
