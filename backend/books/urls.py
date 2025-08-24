from django.urls import path
from .views import ListCreateBookView, RetrieveUpdateDestroyBookView


urlpatterns = [
    path("", ListCreateBookView.as_view()),
    path("<int:pk>/", RetrieveUpdateDestroyBookView.as_view()),
]
