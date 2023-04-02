from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions

from apps.sales.actions.managers.Buy.main import BuyAction


class BuyAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request: Request):
        buy_action = BuyAction()
        buy_action.run(request.data, request.user)
        return Response(data={}, status=status.HTTP_200_OK)
