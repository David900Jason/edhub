from django.db import models
from courses.models import Course


class Book(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField(default="")
    book_url = models.URLField(default="")
    thumbnail_url = models.URLField(default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="books")


