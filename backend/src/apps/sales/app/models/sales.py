from Core.forms.validators import validate_positive_number, validate_range_number
from apps.accounts.app.models import User
from typings.related_manager import ManyToOneField
from apps.core.app.models.bases import BaseModel
from django.db import models
from apps.sales.app.models.products import Product
from apps.sales.app.models.support.choices import SalePaymentTypeChoices, SaleStatusChoices


class Rating(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings', verbose_name='Usuário')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='ratings', verbose_name='Produto')
    rate = models.PositiveIntegerField(
        blank=True, null=True, verbose_name='Taxa de avaliação', validators=[validate_range_number(0, 50)]
    )

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
    total_value = models.PositiveIntegerField(
        verbose_name='Valor total (em centavos)', validators=[validate_positive_number]
    )
    payment_method = models.CharField(
        max_length=64, choices=SalePaymentTypeChoices.choices, verbose_name='Meio de pagamento'
    )
    delivery_fee = models.PositiveIntegerField(blank=True, null=True, verbose_name='Taxa de entrega (em centavos)')
    products_sold: ManyToOneField['ProductSold']
    report = models.JSONField(default=dict)

    @property
    def code(self):
        return str(self.id).split('-')[0]

    def __str__(self):
        return f"Venda#{str(self.code)}"

    class Meta:
        verbose_name = 'Venda'
        verbose_name_plural = 'Vendas'


class ProductSold(BaseModel):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, verbose_name='Venda', related_name='products_sold')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Produto', related_name='products_sold')
    quantity = models.PositiveIntegerField(verbose_name='Quantidade', validators=[validate_positive_number])
    price = models.PositiveIntegerField(verbose_name='Valor total (em centavos)', validators=[validate_positive_number])
    options = models.JSONField(default=dict)

    def __str__(self):
        return 'Produto vendido'

    class Meta:
        verbose_name = 'Produto vendido'
        verbose_name_plural = 'Produtos vendidos'
