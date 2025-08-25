from django.db import models
from courses.models import Course
from videos.models import Video

class Book(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField(default="")

    # Media and URLs
    book_url = models.URLField(default="")
    thumbnail_url = models.URLField(default="")

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    # Relations
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="books")
    video = models.ForeignKey(Video, default=None, on_delete=models.CASCADE, related_name="books")


