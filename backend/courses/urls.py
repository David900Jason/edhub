from django.urls import path
from .views import ListCreateCoursesView, RetrieveUpdateDestroyCoursesView

urlpatterns = [
    path("", ListCreateCoursesView.as_view()),
    path("<uuid:pk>/", RetrieveUpdateDestroyCoursesView.as_view()),
]
