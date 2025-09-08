from django.urls import path
from .views import EnrollmentListCreateView, EnrollmentDetailView, EnrollmentTeachersView

urlpatterns = [
    path("", EnrollmentListCreateView.as_view(), name="enrollment-list-create"),
    path("<int:pk>/", EnrollmentDetailView.as_view(), name="enrollment-detail"),
    path("teachers/", EnrollmentTeachersView.as_view(), name="enrollment-teachers"),
]
