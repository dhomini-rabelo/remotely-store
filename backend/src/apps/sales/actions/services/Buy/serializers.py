from rest_framework import serializers

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
