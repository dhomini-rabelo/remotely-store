from django.contrib import admin
from apps.core.app.models.complements import Address


admin.site.empty_value_display = 'NULL'


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('street', 'unit')
    list_display_links = ('street',)
    # list_filter = '',
    list_per_page = 50
    list_select_related = False  # use tuple, default is False
    ordering = ('id',)
    # actions = None
    # prepopulated_fields = {'slug': 'title',}
    # search_fields = '', # ^ -> startswith, = -> iexact, @ ->	search, None -> icontains

    @admin.display(description='unit')
    def unit(self, obj: Address):
        return obj.unit.name
