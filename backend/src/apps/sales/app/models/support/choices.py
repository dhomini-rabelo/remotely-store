from django.db import models


class SaleStatusChoices(models.TextChoices):
    CANCELED = 'canceled', 'Cancelado'
    IN_ANALYSIS = 'in_analysis', 'Em análise'
    CONFIRMED = 'confirmed', 'Confirmado'
    SENDED = 'sended', 'Enviado'
    COMPLETED = 'completed', 'Concluído'


class SalePaymentTypeChoices(models.TextChoices):
    PIX = 'pix', 'PIX'
    CARD = 'card', 'Cartão'
