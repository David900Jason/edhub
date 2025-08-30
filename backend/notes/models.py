import uuid
from django.db import models
from users.models import User

class Note(models.Model):
    COLORS_CHOICES = (
        ("red", "Red"),
        ("yellow", "Yellow"),
        ("green", "Green"),
        ("blue", "Blue"),
        ("purple", "Purple"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, default="Untitled", blank=True, null=True)
    content = models.TextField(default="", blank=True, null=True)
    user = models.ForeignKey(
        User,
        limit_choices_to={
            "role": "student"
        },
        on_delete=models.CASCADE,
        related_name="notes"
    )

    category = models.CharField(max_length=100, blank=True, null=True)
    color = models.CharField(max_length=20, blank=True, null=True, choices=COLORS_CHOICES)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.user.full_name})"
