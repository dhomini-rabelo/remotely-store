from apps.accounts.app.models import User
from typings.related_manager import RelatedManager
from apps.core.app.models.bases import BaseModel
from django.db import models

from apps.core.app.models.complements import Address
import uuid

from apps.sales.app.models.products import Product
from apps.sales.app.models.support.choices import SalePaymentTypeChoices, SaleStatusChoices


class Rating(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings', verbose_name='Usuário')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='ratings', verbose_name='Produto')
    rate = models.IntegerField(blank=True, null=True, verbose_name='Taxa de avaliação')

    def __str__(self):
        return 'Avaliação'

    class Meta:
        verbose_name = 'Avaliação'
        verbose_name_plural = 'Avaliações'


class ProductSold(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Produto')
    quantity = models.PositiveIntegerField(verbose_name='Quantidade')
    data = models.JSONField(default=dict)
    options = models.JSONField(default=dict)

    def __str__(self):
        return 'Produto vendido'

    class Meta:
        verbose_name = 'Produto vendido'
        verbose_name_plural = 'Produtos vendidos'


class Sale(BaseModel):
    products = models.ManyToManyField(ProductSold, related_name='sales', verbose_name='Produtos')
    client = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='business', verbose_name='Cliente'
    )
    status = models.CharField(max_length=64, choices=SaleStatusChoices.choices, default=SaleStatusChoices.IN_ANALYSIS)
    total_value = models.IntegerField(verbose_name='Valor total (em centavos)')
    payment_type = models.CharField(
        max_length=64, choices=SalePaymentTypeChoices.choices, verbose_name='Meio de pagamento'
    )
    delivery_fee = models.IntegerField(blank=True, null=True, verbose_name='Taxa de entrega (em centavos)')
    report = models.JSONField(default=dict)

    def __str__(self):
        return 'Venda'

    class Meta:
        verbose_name = 'Venda'
        verbose_name_plural = 'Vendas'
