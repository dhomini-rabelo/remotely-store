from rest_framework import serializers
from apps.sales.app.models.products import Department, Product, Provider


class DepartmentHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = 'id', 'name', 'image'


class ProviderHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = (
            'id',
            'name',
        )


class ProductHomeSerializer(serializers.ModelSerializer):
    provider = ProviderHomeSerializer()
    department = DepartmentHomeSerializer()

    def to_representation(self, product: Product):
        print(product.price)
        return {
            **super().to_representation(product),
            'rating': product.rating or 50,
            'price': product.price,
        }

    class Meta:
        model = Product
        fields = ('id', 'name', 'image', 'description', 'provider', 'department')
