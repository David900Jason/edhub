from rest_framework import serializers
from videos.models import Video
from books.models import Book
from .models import Enrollment
from courses.serializers import ListRetrieveCoursesSerializer  # adjust name if different

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "title", "book_url"]

class VideoSerializer(serializers.ModelSerializer):
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ["id", "title", "likes", "views", "thumbnail_url", "video_url"]

    def get_video_url(self, obj):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.video_url)  # makes absolute URL
        return obj.video_url

class EnrollmentSerializer(serializers.ModelSerializer):
    course = ListRetrieveCoursesSerializer(read_only=True)
    videos = serializers.SerializerMethodField()
    books = serializers.SerializerMethodField()

    class Meta:
        model = Enrollment
        fields = ["id", "course", "videos", "books", "amount_paid", "rating", "enrolled_at"]

    def get_videos(self, obj):
        qs = Video.objects.filter(course=obj.course)
        return VideoSerializer(qs, many=True, context=self.context).data

    def get_books(self, obj):
        qs = Book.objects.filter(course=obj.course)
        return BookSerializer(qs, many=True, context=self.context).data
