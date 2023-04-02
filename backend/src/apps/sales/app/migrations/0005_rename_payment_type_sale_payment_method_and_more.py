# Generated by Django 4.1.7 on 2023-04-02 19:13

import Core.forms.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0004_remove_productsold_data_remove_sale_products_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sale',
            old_name='payment_type',
            new_name='payment_method',
        ),
        migrations.AlterField(
            model_name='productsold',
            name='quantity',
            field=models.PositiveIntegerField(validators=[Core.forms.validators.validate_positive_number], verbose_name='Quantidade'),
        ),
    ]