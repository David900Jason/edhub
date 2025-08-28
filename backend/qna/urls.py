# qna/urls.py
from django.urls import path
from .views import (
    QuestionListCreateView,
    QuestionRetrieveUpdateDestroyView,
    ReplyCreateView,
    ReplyRetrieveUpdateDestroyView,
)

urlpatterns = [
    # Questions
    path("questions/", QuestionListCreateView.as_view(), name="questions-list-create"),
    path("questions/<uuid:pk>/", QuestionRetrieveUpdateDestroyView.as_view(), name="questions-rud"),

    # Replies
    path("replies/", ReplyCreateView.as_view(), name="replies-create"),
    path("replies/<uuid:pk>/", ReplyRetrieveUpdateDestroyView.as_view(), name="replies-rud"),
]
