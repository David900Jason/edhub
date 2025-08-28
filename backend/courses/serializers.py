from rest_framework import serializers
from users.serializers import TeacherBriefSerializer
from .models import Course
from books.models import Book
from videos.models import Video
from enrollments.models import Enrollment
from django.db.models import Avg

class PublicBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "title", "book_url"]

class PublicVideoSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ["id", "title", "likes", "views", "thumbnail_url"]

    def get_thumbnail_url(self, obj):
        request = self.context.get("request")
        if obj.thumbnail_url:  # assuming model has ImageField/FileField called `thumbnail`
            url = obj.thumbnail_url.url
            if request:
                return request.build_absolute_uri(url)
            return url  # fallback if request not available
        return None

class ListRetrieveCoursesSerializer(serializers.ModelSerializer):
    teacher = TeacherBriefSerializer(read_only=True)
    rating = serializers.SerializerMethodField()

    def get_rating(self, obj):
        return Enrollment.objects.filter(course=obj).aggregate(Avg('rating'))['rating__avg']

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

    # Calculate average rating from Enrollment Model having same course
    rating = serializers.SerializerMethodField()

    def get_rating(self, obj):
        return Enrollment.objects.filter(course=obj).aggregate(Avg('rating'))['rating__avg']

    class Meta:
        model = Course
        fields = ["id", "title", "description", "price", "discount", "currency", "is_paid", "is_published", "category", "rating", "thumbnail", "teacher", "created_at", "updated_at", "books", "videos"]


