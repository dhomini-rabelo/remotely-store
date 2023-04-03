from rest_framework import status, generics
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import BasePermission
from apps.accounts.actions.serializers.auth.main import CreateUserSerializer, UserLoginSerializer

from apps.accounts.app.models import User


class CreateUserAPI(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
    queryset = User.objects.all()
    permission_classes: list[BasePermission] = []


class LoginAPI(TokenObtainPairView):
    permission_classes: list[BasePermission] = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(
            {"access_token": serializer.validated_data["access"]},
            status=status.HTTP_200_OK,
        )


class MeAPI(generics.RetrieveAPIView):
    def get(self, request: Request):
        return Response(UserLoginSerializer(instance=request.user).data)
