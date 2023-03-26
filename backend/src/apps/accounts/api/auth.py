from rest_framework import status, generics
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import BasePermission
from apps.accounts.actions.serializer.auth import UserLoginSerializer

from apps.accounts.app.models import User


class LoginAPI(TokenObtainPairView):
    permission_classes: list[BasePermission] = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            user = User.objects.get(username=request.data['username'])
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(
            {"access_token": serializer.validated_data["access"], "user": UserLoginSerializer(instance=user).data},
            status=status.HTTP_200_OK,
        )


class MeAPI(generics.RetrieveAPIView):
    queryset = User.objects.all().select_related('company')

    def get(self, request: Request):
        return Response(UserLoginSerializer(instance=request.user).data)
