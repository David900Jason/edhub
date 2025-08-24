from django.contrib import admin
from .models import Video


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "video_url", "thumbnail_url", "course", "created_at", "updated_at", "likes", "views")
    list_filter = ("course", )
    search_fields = ("title", "description", "video_url", "thumbnail_url", "course", "created_at", "updated_at", "likes", "views")

