from django.urls import path
from .views import ListCreateVideoView, RetrieveUpdateDestroyView, LikeView


urlpatterns = [
    path("", ListCreateVideoView.as_view()),
    path("<uuid:pk>/", RetrieveUpdateDestroyView.as_view()),
    path("like/<int:video_id>/", LikeView.as_view()),
]
