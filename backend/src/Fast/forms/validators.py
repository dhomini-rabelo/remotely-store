# django
from django.core.validators import validate_slug, validate_unicode_slug, validate_email
from django.core.exceptions import ValidationError

# others
from string import ascii_letters, digits, punctuation
from typing import Any
from collections.abc import Mapping


def validate_caracters(
    text: str, with_accents=True, spaces=True, use_symbols=True, use_numbers=True, use_underline=True
):
    accents = 'áàéèíìóòúùâêîôûãõ' if with_accents else ''
    space = ' ' if spaces else ''
    symbols = punctuation if use_symbols else ''
    underline = "_" if use_underline else ''
    numbers = digits if use_numbers else ''
    alloweds = symbols + numbers + ascii_letters + accents + space + underline
    for letter in text.lower():
        if letter not in alloweds:
            return False
    return True


def validate_for_email(email: str):
    try:
        validate_email(email)
        return True
    except ValidationError:
        return False


def validate_unique(ModelOrQueryset, field_name: str, field: Any, use_queryset=False) -> bool:
    queryset = ModelOrQueryset.objects if not use_queryset else ModelOrQueryset
    return queryset.filter(**{field_name: field}).exists()


def is_unique(ModelOrQueryset, field_name: str, field: Any, use_queryset=False) -> bool:
    queryset = ModelOrQueryset.objects if not use_queryset else ModelOrQueryset
    return not (queryset.filter(**{field_name: field}).exists())


def validate_for_slug(slug: str):
    if '/' in slug:
        return False
    try:
        validate_slug(slug)
        validate_unicode_slug(slug)
        return True
    except ValidationError:
        return False


def validate_only_numeric(text: Mapping[str, int]):
    for letter in str(text):
        if letter not in list('123456789'):
            return False
    return True
