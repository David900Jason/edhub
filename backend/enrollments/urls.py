from django.urls import path
from .views import ListEnrollmentView, RetrieveDestroyView


urlpatterns = [
    path("", ListEnrollmentView.as_view()),
    path("<int:pk>/", RetrieveDestroyView.as_view()),
]
