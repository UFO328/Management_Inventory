from django.shortcuts import redirect
from django.urls import reverse

class ForcePasswordChangeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        user = request.user

        allowed_paths = [
            reverse("account_app:change_password"),
            reverse("account_app:logout"),
        ]

        if (
            user.is_authenticated and
            user.must_change_password and
            request.path not in allowed_paths
        ):
            return redirect("account_app:change_password")

        response = self.get_response(request)
        return response