from django.urls import path
from .views import ListCreateVideoView


urlpatterns = [
    path("", ListCreateVideoView.as_view())
]
