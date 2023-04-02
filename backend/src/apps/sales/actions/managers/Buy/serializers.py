from rest_framework import serializers

from apps.sales.app.models.products import Product
from apps.sales.app.models.sales import ProductSold, Sale


class ProductCartSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(source='product', read_only=False, queryset=Product.objects.all())

    class Meta:
        model = ProductSold
        fields = (
            'id',
            'quantity',
        )


class ProductSoldBuySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSold
        fields = 'id', 'sale', 'product', 'quantity', 'price'


class ProductSoldBuySerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = (
            'id',
            'client',
            'status',
            'delivery_fee',
            'payment_type',
            'total_value',
            'products_sold',
        )
