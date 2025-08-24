from django.urls import path, include
from .views import ListCreateCoursesView, RetrieveUpdateDestroyCoursesView

urlpatterns = [
    path("", ListCreateCoursesView.as_view()),
    path("<uuid:pk>/", RetrieveUpdateDestroyCoursesView.as_view()),

    path("videos/", include("videos.urls")),
    path("books/", include("books.urls")),
]
