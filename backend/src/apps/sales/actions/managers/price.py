from datetime import datetime, timedelta

from apps.accounts.app.models import User


if __name__ == '__main__':
    from apps.sales.app.models.products import Price


class PriceManager:
    def __init__(self, price: 'Price'):
        self.__price = price

    def disable(self, user: User):
        self.__price.disabled_from = user
        self.__price.disabled_at = datetime.utcnow() - timedelta(hours=3)
        self.__price.save()
