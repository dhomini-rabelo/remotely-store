from django.urls import path
from . import api

urlpatterns = [
    path('home/data', api.HomeDataAPI.as_view(), name='home/data'),
]
