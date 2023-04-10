from django.urls import path
from . import api

app_name = 'sales'

urlpatterns = [
    path('buy', api.BuyAPI.as_view(), name='buy'),
]
