from django.forms import BaseInlineFormSet
from Core.admin.forms.inlines import RequestBaseInlineFormSet
from apps.sales.app.models.products import Department, Price, Product, Provider
from django.http import HttpRequest


class PriceBaseInlineForm(RequestBaseInlineFormSet):
    def save_existing(self, request: HttpRequest, form: BaseInlineFormSet, price: Price, commit: bool = True):
        price.product.manager.update_price(price.value, price.promotional_value, request.user)
