from rest_framework import serializers
from Core.forms.errors import ErrorMessages
from apps.sales.actions.services.Buy.typings import IValidatedProductCart

from apps.sales.app.models.products import Product
from apps.sales.app.models.sales import ProductSold, Sale
from apps.sales.app.models.support.choices import SalePaymentTypeChoices


class ProductCartSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(source='product', read_only=False, queryset=Product.objects.all())

    class Meta:
        model = ProductSold
        fields = (
            'id',
            'quantity',
        )


class BodyBuySerializer(serializers.Serializer):
    products = ProductCartSerializer(many=True)
    payment_method = serializers.ChoiceField(choices=SalePaymentTypeChoices.choices)

    def validate_products(self, products: list[IValidatedProductCart]):
        products_id = list(map(lambda product: str(product['product'].id), products))
        if len(products_id) != len(set(products_id)):
            raise serializers.ValidationError(ErrorMessages.DUPLICATED_PRODUCT_IN_THE_CART)
        return products


class ProductSoldBuySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSold
        fields = 'id', 'product', 'quantity', 'price', 'sale'


class SaleBuySerializer(serializers.ModelSerializer):
    def to_representation(self, sale: Sale):
        return {
            **super().to_representation(sale),
            'code': sale.code,
        }

    class Meta:
        model = Sale
        fields = (
            'id',
            'client',
            'status',
            'delivery_fee',
            'payment_method',
            'total_value',
        )
