from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission
from rest_framework import status, generics
from apps.sales.app.models.products import Department
from apps.core.actions.serializers.home import DepartmentHomeSerializer


class HomeDataAPI(APIView):
    permission_classes: list[BasePermission] = []

    def get(self, request: Request):
        return Response(
            {'departments': DepartmentHomeSerializer(Department.objects.all(), many=True).data},
            status=status.HTTP_200_OK,
        )
