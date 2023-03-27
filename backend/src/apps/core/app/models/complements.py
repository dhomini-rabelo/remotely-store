from Core.forms.validators import validate_cep_field
from apps.core.app.models.bases import BaseModel
from django.db import models

from apps.core.app.models.support.choices import StatesChoices


class Address(BaseModel):
    cep = models.CharField(max_length=9, verbose_name='CEP', validators=[validate_cep_field])
    street = models.CharField(max_length=256, verbose_name='Rua')
    neighborhood = models.CharField(max_length=256, verbose_name='Bairro')
    number = models.CharField(max_length=256, blank=True, null=True, verbose_name='Número')
    complement = models.CharField(max_length=256, blank=True, null=True, verbose_name='Complemento')
    city = models.CharField(max_length=256, verbose_name='Cidade')
    state = models.CharField(max_length=2, choices=StatesChoices.choices, verbose_name='Estado')

    def __str__(self):
        return 'Endereço'

    class Meta:
        verbose_name = 'Endereço'
        verbose_name_plural = 'Endereços'
