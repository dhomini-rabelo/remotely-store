# Generated by Django 4.1.7 on 2023-04-02 19:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0005_rename_payment_type_sale_payment_method_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productsold',
            name='sale',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products_sold', to='sales.sale', verbose_name='Venda'),
        ),
    ]
