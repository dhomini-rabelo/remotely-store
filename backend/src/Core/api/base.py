from rest_framework.views import APIView
from rest_framework.permissions import BasePermission


class NoAuthAPI(APIView):
    permission_classes: list[BasePermission] = []
