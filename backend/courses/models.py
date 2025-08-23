from django.db import models
from users.models import User
import uuid


class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=25, unique=True, null=False)
    description = models.TextField()

    price = models.FloatField(default=0, null=False)
    discount = models.FloatField(default=0)
    currency = models.CharField(max_length=3, default="EGP")

    is_paid = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    category = models.CharField(max_length=12, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    rating = models.FloatField(default=0)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)

    thumbnail = models.URLField()


