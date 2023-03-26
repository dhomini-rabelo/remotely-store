from Core.forms.errors import ErrorMessages
from apps.accounts.actions.serializers.auth.typings import (
    CreateUserRequestBodyType,
    CreateUserValidatedDataType,
)
from apps.accounts.app.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from apps.accounts.app.models import User
from rest_framework import serializers


class CreateUserSerializer(serializers.ModelSerializer):
    def to_representation(self, user: User):
        return {
            "email": user.email,
            "name": user.name,
        }

    def validate(self, validated_data: CreateUserValidatedDataType):
        initial_data: CreateUserRequestBodyType = self.initial_data
        if not initial_data.get('confirm_password'):
            raise serializers.ValidationError({'confirm_password': [ErrorMessages.REQUIRED]})
        elif initial_data['confirm_password'] != validated_data['password']:
            raise serializers.ValidationError({'confirm_password': ['As senhas são diferentes']})
        return validated_data

    def create(self, validated_data: CreateUserValidatedDataType):
        new_user = User(username=validated_data['email'], email=validated_data['email'])
        new_user.set_password(validated_data['password'])
        new_user.save()
        return new_user

    class Meta:
        model = User
        fields = (
            'email',
            'password',
        )
        extra_kwargs = {
            'email': {
                'required': True,
                'validators': [UniqueValidator(queryset=User.objects.all(), message='Este email já foi cadastrado')],
            },
        }


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'name', 'email'
