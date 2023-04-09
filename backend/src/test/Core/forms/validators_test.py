from random import randint
from pytest import mark
from Core.forms.validators import validate_cep_field, validate_positive_number, validate_range_number
from django.core.exceptions import ValidationError


@mark.xfail(raises=ValidationError)
def test_validate_cep_field_only_with_numbers():
    validate_cep_field('12345678')


@mark.xfail(raises=ValidationError)
def test_validate_cep_field_with_invalid_format():
    validate_cep_field('12345+678')


def test_validate_cep_field_when_correct():
    assert validate_cep_field('12345-678') == '12345-678'


@mark.xfail(raises=ValidationError)
def test_validate_positive_number_field_with_negative_number():
    validate_positive_number(-1)


@mark.xfail(raises=ValidationError)
def test_validate_positive_number_field_with_zero():
    assert validate_positive_number(0) == 0


def test_validate_positive_number_field_with_positive_number():
    some_number = randint(1, 1000)
    assert validate_positive_number(some_number) == some_number


@mark.xfail(raises=ValidationError)
def test_validate_range_number_with_minor():
    input_number_less_then_start = 0
    start, end = 1, 100
    validate_function = validate_range_number(start, end)
    validate_function(input_number_less_then_start)


@mark.xfail(raises=ValidationError)
def test_validate_range_number_with_greater():
    input_number_bigger_then_end = 101
    start, end = 1, 100
    validate_function = validate_range_number(start, end)
    validate_function(input_number_bigger_then_end)


@mark.parametrize('input_number', [1, 50, 100])
def test_validate_range_number_when_correct(input_number):
    start, end = 1, 100
    validate_function = validate_range_number(start, end)
    assert validate_function(input_number) == input_number


def test_validate_range_number_with_randint():
    start, end = 1, 100
    input_number = randint(start, end)
    validate_function = validate_range_number(start, end)
    assert validate_function(input_number) == input_number


@mark.xfail(raises=ValueError)
def test_validate_range_number_with_start_bigger_then_end():
    start, end = 100, 1
    input_number = 10
    validate_range_number(start, end)
    validate_function = validate_range_number(start, end)
    assert validate_function(input_number) == input_number
