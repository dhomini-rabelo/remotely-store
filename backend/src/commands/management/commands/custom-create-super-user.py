from ..comand import BasicCommand
from apps.accounts.app.models import User


class Command(BasicCommand):

    help = 'Create superuser with extra fields'

    def handle(self, *args, **options):
        email = 'admin@email.com'
        User.objects.create_superuser(username=email, email=email, password='null0000', name='admin')
