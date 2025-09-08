from django.contrib import admin
from .models import Enrollment

# Register your models here.
@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ["user", "course", "amount_paid", "rating", "enrolled_at"]
    list_filter = ["user", "course", "amount_paid", "rating", "enrolled_at"]
    search_fields = ["user__username", "course__title"]
    ordering = ["-enrolled_at"]
