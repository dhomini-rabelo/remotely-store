from decimal import Decimal
from pytest import fixture, mark
from apps.sales.app.models.products import Product, Price


@fixture
def product_without_price():
    product = Product.objects.create(
        name='test',
        image='',
        department=None,
        provider=None,
    )
    return product


@fixture
def product():
    product = Product.objects.create(
        name='test',
        image='',
        department=None,
        provider=None,
    )
    Price.objects.create(
        value=1000,
        product=product,
    )
    return product


@fixture
def product_and_price():
    product = Product.objects.create(
        name='test',
        image='',
        department=None,
        provider=None,
    )
    price = Price.objects.create(
        value=1000,
        product=product,
    )
    return product, price


@mark.django_db
def test_get_active_price_when_without_price(product_without_price: Product):
    assert product_without_price.manager.get_active_price() is None


@mark.django_db
def test_get_price_when_without_price(product_without_price: Product):
    assert product_without_price.manager.get_price() == 0


@mark.django_db
def test_get_active_price_when_with_price(product: Product):
    assert isinstance(product.manager.get_active_price(), Price)


@mark.django_db
def test_get_price_when_with_price(product: Product):
    assert product.manager.get_price() == 1000


@mark.django_db
def test_update_price(product_and_price: tuple[Product, Price], auth_user):
    product, initial_price = product_and_price
    new_price = Decimal('500.00')
    product.manager.update_price(new_price, None, auth_user)
    current_initial_price = Price.objects.get(id=initial_price.id)
    current_active_price = product.manager.get_active_price()
    assert (
        (current_initial_price.is_active is False)
        and (current_initial_price != current_active_price)
        and (current_active_price.is_active is True)
    )
