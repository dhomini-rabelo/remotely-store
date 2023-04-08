# Generated by Django 4.1.7 on 2023-04-03 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0006_alter_productsold_sale'),
    ]

    operations = [
        migrations.AlterField(
            model_name='price',
            name='promotional_value',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Valor promocional (em centavos)'),
        ),
        migrations.AlterField(
            model_name='price',
            name='value',
            field=models.PositiveIntegerField(verbose_name='Valor (em centavos)'),
        ),
        migrations.AlterField(
            model_name='productsold',
            name='price',
            field=models.PositiveIntegerField(verbose_name='Valor (em centavos)'),
        ),
        migrations.AlterField(
            model_name='rating',
            name='rate',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Taxa de avaliação'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='delivery_fee',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Taxa de entrega (em centavos)'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='total_value',
            field=models.PositiveIntegerField(verbose_name='Valor total (em centavos)'),
        ),
    ]