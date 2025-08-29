# qna/models.py
import uuid
from django.db import models
from users.models import User
from videos.models import Video

class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="questions")
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="questions")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Q by {self.student} on {self.video}"


class Reply(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.OneToOneField(  # ✅ only one reply per question
        Question,
        on_delete=models.CASCADE,
        related_name="reply"
    )
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name="replies")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reply by {self.teacher} to Q: {self.question.id}"
