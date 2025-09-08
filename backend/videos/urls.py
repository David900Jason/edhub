from django.urls import path
from .views import ListCreateVideoView, RetrieveUpdateDestroyView, LikeView, VideoReplaceView, UploadChunkView, MergeChunksView

urlpatterns = [
    path("", ListCreateVideoView.as_view()),
    path("<uuid:pk>/", RetrieveUpdateDestroyView.as_view()),
    path("<uuid:pk>/replace/", VideoReplaceView.as_view()),
    path("upload-chunk/", UploadChunkView.as_view()),
    path("merge-chunks/", MergeChunksView.as_view()),
    path("like/<uuid:pk>/", LikeView.as_view()),
]
