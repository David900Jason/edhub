# qna/views.py
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Question, Reply
from .serializers import QuestionSerializer, ReplySerializer


# ----------- QUESTIONS ------------
class QuestionListCreateView(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Question.objects.all().select_related("video", "student")

        # ✅ Teacher → only questions from their own courses' videos
        if getattr(user, "role", None) == "teacher" or user.is_staff:
            qs = qs.filter(video__course__teacher=user)

        # ✅ Student → only their own questions
        elif getattr(user, "role", None) == "student":
            qs = qs.filter(student=user)

        # ✅ Admin/Superuser → see all (no filter)
        elif user.is_superuser:
            qs = qs  

        else:
            qs = Question.objects.none()

        # Support filtering by ?video=id
        video_id = self.request.query_params.get("video")
        if video_id:
            qs = qs.filter(video__id=video_id)

        return qs


class QuestionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Question.objects.all().select_related("video", "student")

    def perform_update(self, serializer):
        if self.request.user != self.get_object().student:
            raise PermissionDenied("You can only edit your own questions.")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user != instance.student:
            raise PermissionDenied("You can only delete your own questions.")
        instance.delete()


# ----------- REPLIES ------------
class ReplyCreateView(generics.CreateAPIView):
    serializer_class = ReplySerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Reply.objects.all()


class ReplyRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReplySerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Reply.objects.all()

    def perform_update(self, serializer):
        if self.request.user != self.get_object().teacher:
            raise PermissionDenied("You can only edit your own replies.")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user != instance.teacher:
            raise PermissionDenied("You can only delete your own replies.")
        instance.delete()
