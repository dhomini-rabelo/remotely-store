from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission
from rest_framework import status, generics
from apps.sales.app.models.products import Department, Price, Product
from apps.core.actions.serializers.home import DepartmentHomeSerializer, ProductHomeSerializer
from django.db.models import Avg, OuterRef, functions


class HomeDataAPI(APIView):
    permission_classes: list[BasePermission] = []

    def get(self, request: Request):
        return Response(
            {
                'departments': DepartmentHomeSerializer(Department.objects.all(), many=True).data,
                'products': ProductHomeSerializer(
                    Product.objects.annotate(
                        rating=Avg('ratings__rate'),
                        price=Price.objects.filter(product__id=OuterRef("id"), disabled_at=None).values(
                            data=functions.JSONObject(
                                value="value",
                                promotional_value="promotional_value",
                            )
                        )[:1],
                    ).all(),
                    many=True,
                ).data,
            },
            status=status.HTTP_200_OK,
        )
