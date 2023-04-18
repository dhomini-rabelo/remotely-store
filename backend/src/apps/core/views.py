from django.contrib.auth.decorators import login_required
from django.http import HttpRequest
from django.shortcuts import redirect


@login_required
def redirect_to_admin(request: HttpRequest):
    return redirect('/admin/')
