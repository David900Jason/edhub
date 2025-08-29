from django.urls import path
from .views import ListCreateBookView, RetrieveUpdateDestroyBookView, BookUploadView, BookReplaceView


urlpatterns = [
    path("", ListCreateBookView.as_view()),
    path("<int:pk>/", RetrieveUpdateDestroyBookView.as_view()),
    path("upload/", BookUploadView.as_view()),
    path("<int:pk>/replace/", BookReplaceView.as_view()),
]
