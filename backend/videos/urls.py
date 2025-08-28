from django.urls import path
from .views import ListCreateVideoView, RetrieveUpdateDestroyView, VideoUploadView, LikeView, VideoReplaceView

urlpatterns = [
    path("", ListCreateVideoView.as_view()),
    path("<uuid:pk>/", RetrieveUpdateDestroyView.as_view()),
    path("upload/", VideoUploadView.as_view()),
    path("<uuid:pk>/replace/", VideoReplaceView.as_view()),
    path("like/<uuid:pk>/", LikeView.as_view()),
]
