from apps.accounts.app.models import User
from rest_framework import serializers


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'id', 'name', 'email'
