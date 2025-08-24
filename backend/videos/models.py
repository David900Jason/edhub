from django.db import models
from courses.models import Course
from users.models import User
import uuid


class Video(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=25, null=False, unique=True)
    description = models.TextField(null=True, blank=True)

    video_url = models.URLField(default="")
    thumbnail_url = models.URLField(default="")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="videos")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)


class ViewSession(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="view_sessions")
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="viewed_videos")
    timestamp = models.DateTimeField(auto_now_add=True)


class LikeReaction(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="like_reaction")
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="liked_videos")
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("student", "video")


