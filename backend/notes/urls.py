# notes/urls.py
from .views import NoteListCreateView, NoteDetailView
from django.urls import path

urlpatterns = [
    path("", NoteListCreateView.as_view(), name="notes"),
    path("<uuid:pk>/", NoteDetailView.as_view(), name="note"),
]