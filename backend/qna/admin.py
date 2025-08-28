from django.contrib import admin
from .models import Question, Reply

# Register your models here.
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("id", "student", "video", "content", "created_at")
    list_filter = ("student", "video")
    search_fields = ("content",)

@admin.register(Reply)
class ReplyAdmin(admin.ModelAdmin):
    list_display = ("id", "question", "teacher", "content", "created_at")
    list_filter = ("question", "teacher")
    search_fields = ("content",)
