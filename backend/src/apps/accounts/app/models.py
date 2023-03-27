from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=256, verbose_name='Nome')

    def __str__(self):
        return self.username
