from typing import Any
from django.forms import BaseInlineFormSet
from django.http import HttpRequest


class RequestBaseInlineFormSet(BaseInlineFormSet):
    def save(self, request: HttpRequest, commit: bool):
        """
        Save model instances for every form, adding and changing instances
        as necessary, and return the list of instances.
        """
        if not commit:
            self.saved_forms: list[Any] = []

            def save_m2m():
                for form in self.saved_forms:
                    form.save_m2m()

            self.save_m2m = save_m2m
        if self.edit_only:
            return self.save_existing_objects(request, commit)
        else:
            return self.save_existing_objects(request, commit) + self.save_new_objects(commit)

    def save_existing_objects(self, request: HttpRequest, commit=True):
        self.changed_objects = []
        self.deleted_objects = []
        if not self.initial_forms:
            return []

        saved_instances = []
        forms_to_delete = self.deleted_forms
        for form in self.initial_forms:
            obj = form.instance
            # If the pk is None, it means either:
            # 1. The object is an unexpected empty model, created by invalid
            #    POST data such as an object outside the formset's queryset.
            # 2. The object was already deleted from the database.
            if obj.pk is None:
                continue
            if form in forms_to_delete:
                self.deleted_objects.append(obj)
                self.delete_existing(obj, commit=commit)
            elif form.has_changed():
                self.changed_objects.append((obj, form.changed_data))
                saved_instances.append(self.save_existing(request, form, obj, commit=commit))
                if not commit:
                    self.saved_forms.append(form)
        return saved_instances
