import uuid
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

class UserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, **extra_fields)
        user.set_password(password)  # stores hash in `password` field
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None, **extra_fields):
        extra_fields.setdefault("role", "admin")
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, full_name, password, **extra_fields)

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ("student", "Student"),
        ("teacher", "Teacher"),
        ("admin", "Admin"),
    )

    # --- Core Fields ---
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  # will store hashed password
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="student")

    # --- Contact ---
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    parent_number = models.CharField(max_length=15, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)

    # --- Education ---
    school_year = models.IntegerField(default=3, validators=[MinValueValidator(1), MaxValueValidator(3)])  # [1,2,3]
    birth_date = models.DateField(blank=True, null=True)

    # --- Status ---
    is_active = models.BooleanField(default=True)  # controls soft deletion
    is_verified = models.BooleanField(default=False)  # teacher/student verification
    is_staff = models.BooleanField(default=False)  # for Django admin

    # --- Timestamps ---
    last_login = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    # --- Manager ---
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    def __str__(self):
        return f"{self.full_name} ({self.role})"