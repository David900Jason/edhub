from django.urls import path
from .views import ListCreateVideoView, RetrieveUpdateDestroyView, LikeView


urlpatterns = [
    path("", ListCreateVideoView.as_view()),
    path("<int:id>/", RetrieveUpdateDestroyView.as_view()),
    path("<int:video_id>/", LikeView.as_view()),
]
