from typings.related_manager import ManyToOneField
from apps.accounts.app.models import User
from apps.core.app.models.bases import BaseModel
from django.db import models

if __name__ == '__main__':
    from apps.sales.app.models.sales import ProductSold


class Provider(BaseModel):
    name = models.CharField(max_length=256, verbose_name='Nome')
    products: ManyToOneField['Product']

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Fornecedor'
        verbose_name_plural = 'Fornecedores'


class Department(BaseModel):
    name = models.CharField(max_length=256, verbose_name='Nome')
    image = models.ImageField(blank=True, null=True, upload_to='departments/%Y/%m', verbose_name='Imagem')
    products: ManyToOneField['Product']

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Departamento'
        verbose_name_plural = 'Departamentos'


class Product(BaseModel):
    name = models.CharField(max_length=256, verbose_name='Nome')
    image = models.ImageField(blank=True, null=True, upload_to='products/%Y/%m', verbose_name='Imagem')
    description = models.TextField(blank=True, null=True, verbose_name='Descrição')
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True, related_name='products', verbose_name='departamento'
    )
    provider = models.ForeignKey(
        Provider, on_delete=models.SET_NULL, null=True, related_name='products', verbose_name='fornecedor'
    )
    options = models.JSONField(default=dict)
    prices: ManyToOneField['Price']
    products_sold: ManyToOneField['ProductSold']

    def get_price(self) -> int | None:
        current_price = self.prices.filter(disabled_at=None).first()
        return current_price.value if current_price else None

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Produto'
        verbose_name_plural = 'Produtos'


class Price(BaseModel):
    value = models.PositiveIntegerField(verbose_name='Valor (em centavos)')
    promotional_value = models.PositiveIntegerField(
        blank=True, null=True, verbose_name='Valor promocional (em centavos)'
    )
    disabled_at = models.DateTimeField(default=None, blank=True, null=True, verbose_name='Desabilitado em')
    disabled_from = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name='disabled_prices',
        blank=True,
        null=True,
        verbose_name='Desabilitado por',
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='prices', verbose_name='Produto')

    def __str__(self):
        return 'Preço'

    class Meta:
        verbose_name = 'Preço'
        verbose_name_plural = 'Preços'
