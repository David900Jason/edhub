from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import Course


# -----------------------------
# Course Admin
# -----------------------------
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "price", "is_paid", "created_at")
    list_filter = ("is_paid",)
    search_fields = ("title", "description")
    readonly_fields = ("created_at",)
    fields = ("title", "description", "price", "discount", "currency", "is_published",
            "is_paid", "thumbnail", "teacher", "created_at")
