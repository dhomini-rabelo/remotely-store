from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.accounts.app'
    verbose_name = 'Contas'
    label = 'accounts'
