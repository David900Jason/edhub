import uuid
from django.db import models
from users.models import User

class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=40, unique=True, null=False)
    description = models.TextField()
    category = models.CharField(max_length=40, blank=False, null=False)

    # Money
    price = models.FloatField(default=0, null=False)
    discount = models.FloatField(default=0)
    currency = models.CharField(max_length=3, default="EGP")

    # Booleans
    is_paid = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    # Relations
    teacher = models.ForeignKey(
        User,
        limit_choices_to={'role': 'teacher'},
        related_name="courses",
        on_delete=models.CASCADE
    )

    thumbnail = models.URLField(default="")



