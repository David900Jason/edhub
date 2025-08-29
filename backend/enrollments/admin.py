from django.contrib import admin
from .models import Enrollment


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "course", "amount_paid", "timestamp", "rating")
    list_filter = ("course", "timestamp")
    search_fields = ("user__fullname", "course__title")
    ordering = ("-timestamp",)

