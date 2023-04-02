from django.urls import path
from . import api

urlpatterns = [
    path('buy', api.BuyAPI.as_view(), name='buy'),
]
