from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserActivateView, SignupView, LoginView, ForgotPasswordView


urlpatterns = [
    path("signup", SignupView.as_view()),
    path("login", LoginView.as_view()),
    path("refresh", TokenRefreshView.as_view()),  # optional
    path("activate/<uuid:pk>", UserActivateView.as_view(), name="user-activate"),
    # path("forgot-password", ForgotPasswordView.as_view(), name="forgot-password"),
]
