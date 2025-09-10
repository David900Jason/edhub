from django.contrib import admin
from .models import LikeReaction, Video


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "video_url", "thumbnail_url", "course", "created_at", "updated_at", "likes", "views")
    list_filter = ("course", )
    search_fields = ("id", "title", "description", "video_url", "thumbnail_url", "course", "created_at", "updated_at", "likes", "views")


@admin.register(LikeReaction)
class LikeReactionAdmin(admin.ModelAdmin):
    list_display = ("id", "student", "video", "timestamp")
    list_filter = ("student", "video", "timestamp")
    search_fields = ("id", "student", "video", "timestamp")
