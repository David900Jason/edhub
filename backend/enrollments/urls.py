from django.urls import path
from .views import ListEnrollmentView, RetrieveDestroyView


urlpatterns = [
    path("enrollments/", ListEnrollmentView.as_view()),
    path("enrollments/<int:id>/", RetrieveDestroyView.as_view()),
]
