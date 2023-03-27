from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.core.app.models.complements import Address

if __name__ == '__main__':
    from apps.sales.app.models.products import Product


class User(AbstractUser):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=256, verbose_name='Nome')
    # phone = models.CharField(max_length=128, blank=True, null=True, verbose_name='Celular')
    # email = models.EmailField(blank=True, null=True, verbose_name='Email')
    # address = models.OneToOneField(
    #     Address, on_delete=models.CASCADE, blank=True, null=True, related_name='user', verbose_name='Endereço'
    # )
    # favorite_products = models.ManyToManyField('sales.Product', blank=True, related_name='users_as_favorite')

    def __str__(self):
        return self.username
