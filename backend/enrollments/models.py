from django.db import models
from django.conf import settings
from courses.models import Course  # adjust if your course app is named differently

class Enrollment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="enrollments")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrollments")
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    rating = models.PositiveIntegerField(default=0, null=True, blank=True)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "course")
        ordering = ["-enrolled_at"]

    def __str__(self):
        return f"{self.user} enrolled in {self.course}"
