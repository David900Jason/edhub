# models.py
from django.db import models

class ContactMessage(models.Model):
    MESSAGE_TYPES = [
        ("general", "General Inquiry"),
        ("tech", "Technical Support"),
        ("billing", "Billing & Payments"),
        ("enroll", "Course Enrollment"),
        ("teacher", "Teacher Application"),
        ("feedback", "Feedback & Suggestions"),
        ("partner", "Collaboration / Partnership"),
        ("other", "Other")
    ]

    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField(default="", blank=True, null=True)
    type = models.CharField(max_length=20, choices=MESSAGE_TYPES, default="general")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.get_type_display()}] {self.name if hasattr(self, 'name') else self.message[:20]}"
