from typing import Any
from django.core.exceptions import ValidationError
import re


def is_valid_cep(field: str):
    field = str(field)
    pattern_cep = re.compile(r'^\d{5}-\d{3}$')
    match_cep = re.fullmatch(pattern_cep, field)
    return match_cep is not None


def validate_cep_field(value: str):
    if not is_valid_cep(value):
        raise ValidationError('Formato inválido')
    return value


def validate_positive_number(value: int):
    if value <= 0:
        raise ValidationError('Informe um número positivo')
    return value


def validate_range_number(start: int, end: int):
    if start >= end:
        raise ValueError('The {start} value must be less then {end}')

    def validate_function(value: int):
        if value not in range(start, end + 1):
            raise ValidationError(f'Informe um número entre {start} e {end}')
        return value

    return validate_function
