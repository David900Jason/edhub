from rest_framework import serializers
from users.serializers import TeacherBriefSerializer
from .models import Course


class ListRetrieveCoursesSerializer(serializers.ModelSerializer):
    teacher = TeacherBriefSerializer(read_only=True)

    class Meta:
        model = Course
        fields = ["id", "title", "description", "price", "discount", "currency", "is_paid", "is_published", "category", "rating", "thumbnail", "teacher", "created_at", "updated_at"]


class CreateCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["title", "description", "price", "discount", "currency", "is_published", "is_published", "category", "thumbnail"]

