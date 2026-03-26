from django.urls import path

from .views import LoginView, LogoutView, MeView, RefreshView, RegisterView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="Register"),
    path("login/", LoginView.as_view(), name="Login"),
    path("refresh/", RefreshView.as_view(), name="Refresh"),
    path("me/", MeView.as_view(), name="Me"),
    path("logout/", LogoutView.as_view(), name="Logout"),
]
