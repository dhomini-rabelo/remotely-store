from django.urls import path
from . import api, views

app_name = 'core'

urlpatterns = [
    path('api/home/data', api.HomeDataAPI.as_view(), name='home/data'),
    path('', views.redirect_to_admin, name='redirect_to_admin'),
]
