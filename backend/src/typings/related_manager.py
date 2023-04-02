# from django.db.models.fields.related_descriptors import create_reverse_many_to_one_manager
from django.db.models import QuerySet, Manager
from typing import Generic, TypeVar, Callable

_T = TypeVar("_T")


class RelatedManager(Manager[_T], Generic[_T]):
    # Related Manager for many to one relationship

    def add(self, *objs: _T):
        pass

    def remove(self, *objs: _T):
        pass

    def set(self, objs: list[_T] | QuerySet[_T]):
        pass

    def clear(self):
        pass

    def create(self, **kwargs):
        pass

    async def acreate(self, **kwargs):
        pass

    def get_or_create(self, **kwargs):
        pass

    async def aget_or_create(self, **kwargs):
        pass

    def update_or_create(self, **kwargs):
        pass

    async def aupdate_or_create(self, **kwargs):
        pass
