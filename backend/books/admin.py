from django.contrib import admin
from .models import Book


@admin.register(Book)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "book_url", "thumbnail_url", "created_at", "updated_at", "course")
    list_filter = ("course",)
    search_fields = ("title", "description")
    readonly_fields = ("created_at", "updated_at")
    fields = ("title", "description", "book_url", "thumbnail_url", "created_at", "updated_at", "course")
