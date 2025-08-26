from rest_framework import serializers
from courses.serializers import ListRetrieveCoursesSerializer
from .models import Book
from courses.models import Course
from videos.models import Video


class PublicBookSerializer(serializers.ModelSerializer):
    course = ListRetrieveCoursesSerializer()


    class Meta:
        model = Book
        fields = ["id", "title", "description", "thumbnail_url", "created_at", "updated_at", "course"]


class PublicCreateBookSerializer(serializers.ModelSerializer):
    def validate_course(self, value):
        request = self.context.get("request")
        if not request or not request.user:
            raise serializers.ValidationError("Request context required.")

        if request.user.is_superuser:
            return value

        if not request.user.is_staff:
            raise serializers.ValidationError("You're not a teach bruh")

        if value.teacher != request.user:
            raise serializers.ValidationError("You do not own this course.")
        return value


    class Meta:
        model = Book
        fields = ["id", "title", "description", "book_url", "thumbnail_url", "created_at", "updated_at", "course"]


class PrivateBookSerializer(serializers.ModelSerializer):
    course = ListRetrieveCoursesSerializer()
    related_videos = serializers.SerializerMethodField()

    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)

    def get_related_videos(self, obj):
        return list(Video.objects.filter(course=obj.course).values_list("id", flat=True))


    class Meta:
        model = Book
        fields = ["id", "title", "description", "thumbnail_url", "book_url", "created_at", "updated_at", "course", "related_videos"]


