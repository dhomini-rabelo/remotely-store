from django.contrib import admin
from django.db.models import Count
from apps.sales.app.forms import PriceBaseInlineForm
from apps.sales.app.models.products import Department, Price, Product, Provider

from apps.sales.app.models.sales import ProductSold, Sale, Rating
from django.http import HttpRequest

admin.site.empty_value_display = 'NULL'


class InlineProductsSoldAdmin(admin.TabularInline):
    model = ProductSold
    fields = 'product', 'quantity', 'price'
    readonly_fields = 'product', 'quantity', 'price'
    extra = 0
    max_num = 0
    min_num = 0
    can_delete = False


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    fields = (
        'client',
        'status',
        'payment_method',
        'delivery_fee',
        'total_value',
    )
    readonly_fields = (
        'client',
        'status',
        'payment_method',
        'delivery_fee',
        'total_value',
    )
    list_display = 'code_column', 'client', 'payment_method', 'total_value', 'items_column'
    list_display_links = ('code_column',)
    # list_filter = ('client',)
    exclude = 'report', 'created_at', 'updated_at'
    list_per_page = 50
    ordering = ('client__username',)
    # actions = None
    # prepopulated_fields = {'slug': 'title',}
    search_fields = ('client',)  # ^ -> startswith, = -> iexact, @ ->	search, None -> icontains
    inlines = (InlineProductsSoldAdmin,)

    def get_queryset(self, request: HttpRequest):
        return Sale.objects.select_related('client').annotate(products_sold_quantity=Count('products_sold'))

    @admin.display(description='Código')
    def code_column(cls, sale: Sale):
        return sale.code

    @admin.display(description='Itens')
    def items_column(cls, sale: Sale):
        return sale.products_sold_quantity


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
    search_fields = ('user__username', 'product__name')  # ^ -> startswith, = -> iexact, @ ->	search, None -> icontains


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


@admin.register(ProductSold)
class ProductSoldAdmin(admin.ModelAdmin):
    fields = 'product', 'sale', 'quantity', 'price'
    readonly_fields = 'product', 'sale', 'quantity', 'price'
    list_display = ('product', 'sale', 'quantity', 'price')
    list_display_links = ('product',)
    # list_filter = '',
    list_per_page = 50
    list_select_related = False  # use tuple, default is False
    ordering = ('product__name',)
    # actions = None
    # prepopulated_fields = {'slug': 'title',}
    search_fields = ('product__name', 'sale__id')  # ^ -> startswith, = -> iexact, @ ->	search, None -> icontains


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


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    fields = (
        'value',
        'promotional_value',
        'disabled_at',
        'disabled_from',
        'product',
        'is_active',
    )
    readonly_fields = (
        'value',
        'promotional_value',
        'disabled_at',
        'disabled_from',
        'product',
        'is_active',
    )
    list_display = (
        'product',
        'value',
        'is_active',
    )
    list_display_links = ('value',)
    list_filter = ('is_active',)
    list_per_page = 50
    list_select_related = False  # use tuple, default is False
    ordering = ('value',)
    # actions = None
    # prepopulated_fields = {'slug': 'title',}
    search_fields = ('product__name', 'value')  # ^ -> startswith, = -> iexact, @ ->	search, None -> icontains


class InlinePriceAdmin(admin.TabularInline):
    model = Price
    fields = 'value', 'promotional_value'
    extra = 0
    min_num = 1
    max_num = 1
    can_delete = False
    formset = PriceBaseInlineForm

    def get_queryset(self, request: HttpRequest):
        return super().get_queryset(request).filter(disabled_at=None)


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
    inlines = (InlinePriceAdmin,)

    def save_formset(self, request, form, formset, change):
        formset.save(request, commit=True)
