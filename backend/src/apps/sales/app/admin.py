from django.contrib import admin
from apps.sales.app.models.products import Department, Price, Product, Provider

from apps.sales.app.models.sales import Sale, Rating

admin.site.empty_value_display = 'NULL'


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = 'client', 'payment_type', 'total_value'
    list_display_links = ('client',)
    list_filter = ('client',)
    list_per_page = 50
    list_select_related = ('client',)  # use tuple, default is False
    ordering = ('client__name',)
    # actions = None
    # prepopulated_fields = {'slug': 'title',}
    search_fields = ('client',)  # ^ -> startswith, = -> iexact, @ ->	search, None -> icontains


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'rate')
    list_display_links = ('rate',)
    # list_filter = '',
    list_per_page = 50
    list_select_related = False  # use tuple, default is False
    ordering = ('user', 'product')
    # actions = None
    # prepopulated_fields = {'slug': 'title',}
    search_fields = ('user', 'product')  # ^ -> startswith, = -> iexact, @ ->	search, None -> icontains


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_display_links = ('name',)
    # list_filter = '',
    list_per_page = 50
    list_select_related = False  # use tuple, default is False
    ordering = ('name',)
    # actions = None
    # prepopulated_fields = {'slug': 'title',}
    search_fields = ('name',)  # ^ -> startswith, = -> iexact, @ ->	search, None -> icontains


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_display_links = ('name',)
    # list_filter = '',
    list_per_page = 50
    list_select_related = False  # use tuple, default is False
    ordering = ('name',)
    # actions = None
    # prepopulated_fields = {'slug': 'title',}
    search_fields = ('name',)  # ^ -> startswith, = -> iexact, @ ->	search, None -> icontains


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'department',
    )
    list_display_links = ('name',)
    list_filter = ('department',)
    exclude = ('options',)
    list_per_page = 50
    list_select_related = ('department',)  # use tuple, default is False
    ordering = ('name',)
    actions = None
    # prepopulated_fields = {'slug': 'title',}
    search_fields = (
        'name',
        'department',
    )  # ^ -> startswith, = -> iexact, @ ->	search, None -> icontains


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = (
        'product',
        'value',
        'is_active',
    )
    list_display_links = ('value',)
    # list_filter = '',
    list_per_page = 50
    list_select_related = False  # use tuple, default is False
    ordering = ('value',)
    # actions = None
    # prepopulated_fields = {'slug': 'title',}
    search_fields = ('value',)  # ^ -> startswith, = -> iexact, @ ->	search, None -> icontains
