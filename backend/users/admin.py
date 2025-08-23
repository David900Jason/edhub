from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = (
        "id", "full_name", "email", "role",
        "phone_number", "parent_number", "birth_date",
        "city", "is_active", "is_verified",
        "last_login", "created_at", "updated_at",
    )
    list_filter = ("role", "is_active", "is_verified", "city")
    search_fields = ("full_name", "email", "phone_number", "parent_number", "city")
    ordering = ("-created_at",)

    # Make some fields read-only (auto-managed)
    readonly_fields = ("last_login", "created_at", "updated_at")

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal Info"), {
            "fields": (
                "full_name", "phone_number", "parent_number",
                "birth_date", "city"
            )
        }),
        (_("Status & Permissions"), {
            "fields": (
                "role", "is_active", "is_verified",
                "is_staff", "is_superuser", "groups", "user_permissions"
            )
        }),
        (_("Important Dates"), {"fields": ("last_login", "created_at", "updated_at")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "full_name", "password1", "password2", "role",
                "phone_number", "parent_number", "birth_date", "city",
                "is_active", "is_verified"
            ),
        }),
    )

# # -----------------------------
# # Video Admin
# # -----------------------------
# @admin.register(Video)
# class VideoAdmin(admin.ModelAdmin):
#     list_display = ("id", "title", "course", "likes", "views", "created_at")
#     list_filter = ("course",)
#     search_fields = ("title", "description")
#     readonly_fields = ("created_at", "likes", "views")
#     # Show file and thumbnail in admin
#     fields = ("course", "title", "description", "file", "thumbnail", "likes", "views", "created_at")


# # -----------------------------
# # Book Admin
# # -----------------------------
# @admin.register(Book)
# class BookAdmin(admin.ModelAdmin):
#     list_display = ("title", "course", "video")
#     list_filter = ("course", "video")
#     search_fields = ("title",)
#     fields = ("course", "video", "title", "file")


# # -----------------------------
# # Question Admin
# # -----------------------------
# @admin.register(Question)
# class QuestionAdmin(admin.ModelAdmin):
#     list_display = ("type", "exam", "quiz", "question_text", "marks", "created_at")
#     list_filter = ("type", "exam", "quiz")
#     search_fields = ("question_text",)
#     fields = ("exam", "quiz", "type", "question_text", "options", "correct_answer", "marks", "created_at")
#     readonly_fields = ("created_at",)


# # -----------------------------
# # Exam Admin
# # -----------------------------
# @admin.register(Exam)
# class ExamAdmin(admin.ModelAdmin):
#     list_display = ("title", "course", "duration", "created_at", "marks")
#     list_filter = ("course",)
#     search_fields = ("title",)
#     readonly_fields = ("created_at", "marks")
#     fields = ("course", "title", "duration", "created_at")


# # -----------------------------
# # Quiz Admin
# # -----------------------------
# @admin.register(Quiz)
# class QuizAdmin(admin.ModelAdmin):
#     list_display = ("title", "video", "duration", "created_at")
#     list_filter = ("video",)
#     search_fields = ("title",)
#     readonly_fields = ("created_at",)
#     fields = ("video", "title", "duration", "created_at")


# # -----------------------------
# # Assignment Admin
# # -----------------------------
# @admin.register(Assignment)
# class AssignmentAdmin(admin.ModelAdmin):
#     list_display = ("title", "course", "created_at")
#     list_filter = ("course",)
#     search_fields = ("title",)
#     readonly_fields = ("created_at",)
#     fields = ("course", "title", "description", "created_at")


# # -----------------------------
# # Course Admin
# # -----------------------------
# @admin.register(Course)
# class CourseAdmin(admin.ModelAdmin):
#     list_display = ("id", "title", "subject", "school_year", "price", "is_paid", "created_at")
#     list_filter = ("subject", "school_year", "is_paid")
#     search_fields = ("title", "description")
#     readonly_fields = ("created_at",)
#     fields = ("title", "description", "price", "school_year", "discount", "currency",
#             "is_paid", "subject", "thumbnail", "teacher", "created_at")
