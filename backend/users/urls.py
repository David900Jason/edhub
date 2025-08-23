# users/urls.py
from django.urls import path
from .views import UserListView, UserMeView, TeacherDetailView, UserDetailView, UserDeactivateView

urlpatterns = [
    path('', UserListView.as_view(), name="user-list"),
    path('me', UserMeView.as_view(), name="user-me"),
    path('<uuid:pk>', UserDetailView.as_view(), name="user-detail"),
    path('<uuid:pk>/deactivate', UserDeactivateView.as_view(), name="user-deactivate"),
    path('teacher/<uuid:pk>', TeacherDetailView.as_view(), name="teacher-detail"),
]
