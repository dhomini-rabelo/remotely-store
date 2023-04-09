from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from apps.sales.actions.services.Buy.main import BuyAction


class BuyAPI(APIView):
    def post(self, request: Request):
        buy_action = BuyAction()
        buy_code = buy_action.run(request.data, request.user)
        return Response(data={'code': buy_code}, status=status.HTTP_200_OK)
