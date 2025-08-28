from django.db import models
from users.models import User

class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="enrollments")
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name="enrollments")
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(default=0)
