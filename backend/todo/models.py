from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Todo(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("in-progress", "In Progress"),
        ("completed", "Completed"),
    ]

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, limit_choices_to={ 'role': 'student' }, on_delete=models.CASCADE, related_name="todos")
    task = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.task} ({self.status})"
