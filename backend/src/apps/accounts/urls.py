from django.urls import path
from . import api

urlpatterns = [
    path('login', api.LoginAPI.as_view(), name='login'),
    path('me', api.MeAPI.as_view(), name='me'),
]
