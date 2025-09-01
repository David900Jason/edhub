from django.urls import path
from .views import (
    AdminPaymentRecordsView,
    StudentAdminOnlyListView,
    TeacherAdminOnlyListView,
    UserAdminToggleActiveState,
    UserAdminToggleVerifiedState,
    StudentsWalletsAdminView,
    StudentWalletAdminUpdateView,
    AdminPaymentRecordsCreateView,
)

urlpatterns = [
    path("students/", StudentAdminOnlyListView.as_view()),
    path("students/wallets/", StudentsWalletsAdminView.as_view()),
    path("students/wallets/<uuid:pk>/", StudentWalletAdminUpdateView.as_view()),
    path("teachers/", TeacherAdminOnlyListView.as_view()),
    path("users/<uuid:pk>/activate/", UserAdminToggleActiveState.as_view()),
    path("users/<uuid:pk>/verify/", UserAdminToggleVerifiedState.as_view()),
    path("payments/", AdminPaymentRecordsView.as_view()),
    path("payments/create/", AdminPaymentRecordsCreateView.as_view()),
]