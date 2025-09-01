# users/urls.py
from django.urls import path
from .views import (
    UserListView,
    UserMeView,
    UserDashboardView,
    UserDetailView,
    TeacherDetailView,
    TeacherListView,
)

urlpatterns = [
    path('', UserListView.as_view(), name="user-list"),
    path('me/', UserMeView.as_view(), name="user-me"),
    path('me/dashboard/', UserDashboardView.as_view(), name="user-dashboard"),
    path('<uuid:pk>', UserDetailView.as_view(), name="user-detail"),
    path('teacher/<uuid:pk>/', TeacherDetailView.as_view(), name="teacher-detail"),
    path('teachers/', TeacherListView.as_view(), name="teacher-list"),
]
