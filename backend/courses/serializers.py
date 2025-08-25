from rest_framework import serializers
from users.serializers import TeacherBriefSerializer
from .models import Course
from books.models import Book
from videos.models import Video


class PublicBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "title"]


class PublicVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ["id", "title"]


class ListRetrieveCoursesSerializer(serializers.ModelSerializer):
    teacher = TeacherBriefSerializer(read_only=True)

    class Meta:
        model = Course
        fields = ["id", "title", "description", "price", "discount", "currency", "is_paid", "is_published", "category", "rating", "thumbnail", "teacher", "created_at", "updated_at"]


class CreateCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["title", "description", "price", "discount", "currency", "is_published", "is_published", "category", "thumbnail"]


class PrivateCourse(serializers.ModelSerializer):
    books = PublicBookSerializer(many=True, read_only=True)
    videos = PublicVideoSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ["id", "title", "description", "price", "discount", "currency", "is_paid", "is_published", "category", "rating", "thumbnail", "teacher", "created_at", "updated_at", "books", "videos"]


