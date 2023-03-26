from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    name = models.CharField(max_length=256, verbose_name='Nome')

    def __str__(self):
        return self.username
