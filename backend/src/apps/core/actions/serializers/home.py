from rest_framework import serializers
from apps.sales.app.models.products import Department


class DepartmentHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = 'id', 'name', 'image'
