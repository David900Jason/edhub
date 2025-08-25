from rest_framework import serializers
from .models import Enrollment
from courses.serializers import ListRetrieveCoursesSerializer, PublicBookSerializer, PublicVideoSerializer
from books.models import Book
from videos.models import Video


class EnrollmentSerializer(serializers.ModelSerializer):
    course = ListRetrieveCoursesSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = ["id", "course", "rating", "timestamp"]


class PrivateEnrollmentSerializer(serializers.ModelSerializer):
    course = ListRetrieveCoursesSerializer(read_only=True)
    books = serializers.SerializerMethodField()
    videos = serializers.SerializerMethodField()

    class Meta:
        model = Enrollment
        fields = ["id", "course", "rating", "timestamp", "books", "videos"]


    def get_books(self, obj):
        qs = Book.objects.filter(course=obj.course)
        return PublicBookSerializer(qs, many=True).data

    def get_videos(self, obj):
        qs = Video.objects.filter(course=obj.course)
        return PublicVideoSerializer(qs, many=True).data

