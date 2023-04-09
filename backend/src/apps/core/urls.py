from django.urls import path
from . import api

app_name = 'core'

urlpatterns = [
    path('home/data', api.HomeDataAPI.as_view(), name='home/data'),
]
