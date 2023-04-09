from pytest import fixture, mark
from django.core.exceptions import ValidationError
from apps.sales.app.models.products import Product, Price


@fixture
def price():
    product = Product.objects.create(
        name='test',
        image='',
        department=None,
        provider=None,
    )
    return Price.objects.create(
        value=1000,
        product=product,
    )


@mark.django_db
def test_disable_price(price: Price, auth_user):
    price.manager.disable(auth_user)
    current_price = Price.objects.get(id=price.id)
    assert current_price.disabled_from == auth_user and (current_price.is_active is False)


@mark.django_db
@mark.xfail(raises=ValidationError)
def test_pre_save_and_clean_method(price: Price):
    price.value = 500
    price.promotional_value = 600
    price.clean()
