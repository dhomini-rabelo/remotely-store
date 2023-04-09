from django.urls import path
from . import api

app_name = 'accounts'

urlpatterns = [
    path('login', api.LoginAPI.as_view(), name='login'),
    path('me', api.MeAPI.as_view(), name='me'),
    path('register', api.CreateUserAPI.as_view(), name='register'),
]
