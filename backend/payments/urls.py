# payments/urls.py
from django.urls import path
from .views import (
    WalletMeView,
    WalletPaymentsView,
    WalletTopUpView,
    WalletOpenView,
    AdminPaymentCreateView,
)

urlpatterns = [
    path("wallet/me/", WalletMeView.as_view(), name="wallet-me"),
    path("wallet/me/open/", WalletOpenView.as_view(), name="wallet-open"),
    path("wallet/me/payments/", WalletPaymentsView.as_view(), name="wallet-payments"),
    path("wallet/me/topup/", WalletTopUpView.as_view(), name="wallet-topup"),
    path("admin/payments/", AdminPaymentCreateView.as_view(), name="admin-payments"),
]
