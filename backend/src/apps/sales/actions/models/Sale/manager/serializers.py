from rest_framework import serializers

from apps.sales.app.models.sales import ProductSold, Sale


class ProductCartSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(source='product')

    class Meta:
        model = ProductSold
        fields = (
            'id',
            'quantity',
        )


class ProductSoldSaleManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSold
        fields = 'id', 'sale', 'product', 'quantity', 'price'


class ProductSoldSaleManagerSerializer(serializers.ModelSerializer):
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
