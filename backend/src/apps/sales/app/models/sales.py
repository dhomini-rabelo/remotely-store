from Core.forms.validators import validate_positive_number
from apps.accounts.app.models import User
from typings.related_manager import RelatedManager
from apps.core.app.models.bases import BaseModel
from django.db import models
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


class Sale(BaseModel):
    client = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='business', verbose_name='Cliente'
    )
    status = models.CharField(max_length=64, choices=SaleStatusChoices.choices, default=SaleStatusChoices.IN_ANALYSIS)
    total_value = models.IntegerField(verbose_name='Valor total (em centavos)')
    payment_method = models.CharField(
        max_length=64, choices=SalePaymentTypeChoices.choices, verbose_name='Meio de pagamento'
    )
    delivery_fee = models.IntegerField(blank=True, null=True, verbose_name='Taxa de entrega (em centavos)')
    products_sold: RelatedManager['ProductSold']
    report = models.JSONField(default=dict)

    def __str__(self):
        return 'Venda'

    class Meta:
        verbose_name = 'Venda'
        verbose_name_plural = 'Vendas'


class ProductSold(BaseModel):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, verbose_name='Produto', related_name='products_sold')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Produto', related_name='products_sold')
    quantity = models.PositiveIntegerField(verbose_name='Quantidade', validators=[validate_positive_number])
    price = models.IntegerField(verbose_name='Valor (em centavos)')
    options = models.JSONField(default=dict)

    def __str__(self):
        return 'Produto vendido'

    class Meta:
        verbose_name = 'Produto vendido'
        verbose_name_plural = 'Produtos vendidos'
