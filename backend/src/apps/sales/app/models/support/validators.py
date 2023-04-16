from django.core.exceptions import ValidationError


def validate_between_0_and_50(value: int):
    start, end = 0, 50
    if value not in range(start, end + 1):
        raise ValidationError(f'Informe um número entre {start} e {end}')
    return value
