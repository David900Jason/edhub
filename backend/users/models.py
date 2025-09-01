import uuid
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

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
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, full_name, password, **extra_fields)

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    ROLES_CHOICES = [
        ("student", "Student"),
        ("teacher", "Teacher"),
        ("admin", "Admin"),
    ]

    # --- Core Fields ---
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  # will store hashed password
    role = models.CharField(max_length=10, choices=ROLES_CHOICES, default="student")
    profile_img = models.FileField(upload_to="profile_images/", blank=True, null=True, default="profile_images/avatar.jpg")

    # --- Contact ---
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    parent_number = models.CharField(max_length=15, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)

    # --- Education ---
    birth_date = models.DateField(blank=True, null=True)

    # --- Status ---
    is_active = models.BooleanField(default=True)  # controls soft deletion
    is_verified = models.BooleanField(default=False)  # teacher/student verification
    is_superuser = models.BooleanField(default=False)  # for Django admin
    is_staff = models.BooleanField(default=False) # for teacher status

    # --- Timestamps ---
    last_login = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # --- Manager ---
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    def save(self, *args, **kwargs):
        if self.role == "teacher":
            self.is_staff = True
        elif self.role == "admin":
            self.is_staff = True
            self.is_superuser = True
        else:
            self.is_staff = False
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.full_name} ({self.role})"
