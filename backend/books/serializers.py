from rest_framework import serializers
from courses.serializers import ListRetrieveCoursesSerializer
from .models import Book
from videos.models import Video
from courses.models import Course


class PublicBookSerializer(serializers.ModelSerializer):
    course = ListRetrieveCoursesSerializer()
    video = serializers.SerializerMethodField()

    def get_video(self, obj):
        if obj.video:  # Check if video exists
            return { "id": obj.video.id, "title": obj.video.title }
        return None  # or {} if you prefer empty object

    class Meta:
        model = Book
        fields = [
            "id", "title", "description", "thumbnail_url",
            "book_url", "created_at", "updated_at",
            "course", "video"
        ]



class PublicCreateBookSerializer(serializers.ModelSerializer):
    course = serializers.SerializerMethodField(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source="course",
        write_only=True,
    )

    video = serializers.SerializerMethodField(read_only=True)
    video_id = serializers.PrimaryKeyRelatedField(
        queryset=Video.objects.all(),
        source="video",
        write_only=True,
    )

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
        fields = ["id", "title", "description", "book_url", "thumbnail_url", "created_at", "updated_at", "course", "course_id", "video", "video_id"]


class PrivateBookSerializer(serializers.ModelSerializer):
    course = ListRetrieveCoursesSerializer(read_only=True)
    related_videos = serializers.SerializerMethodField()

    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source="course",
        write_only=True,
    )

    video_id = serializers.PrimaryKeyRelatedField(
        queryset=Video.objects.all(),
        source="video",
        write_only=True,
    )

    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)

    def get_related_videos(self, obj):
        return list(Video.objects.filter(course=obj.course).values_list("id", flat=True))

    class Meta:
        model = Book
        fields = ["id", "title", "description", "thumbnail_url", "book_url", "created_at", "updated_at", "course", "course_id", "video", "video_id", "related_videos"]


class RelatedBooksSerializer(serializers.ModelSerializer):
    book_url = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ["id", "title", "book_url"]

    def get_book_url(self, obj):
        request = self.context.get("request")
        # Handle FileField or CharField consistently
        url = getattr(obj.book_url, "url", obj.book_url)

        if url and request:
            return request.build_absolute_uri(url)
        elif url:
            return f"{settings.MEDIA_URL}{url}"
        return None


class BookUploadSerializer(serializers.ModelSerializer):
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source="course",
        write_only=True
    )
    video_id = serializers.PrimaryKeyRelatedField(
        queryset=Video.objects.all(),
        source="video",
        write_only=True,
        allow_null=True,
        required=False
    )
    course = serializers.StringRelatedField(read_only=True)
    video = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Book
        fields = [
            "id", "title", "description",
            "book_url", "thumbnail_url",
            "created_at", "updated_at",
            "course_id", "video_id", "course", "video"
        ]
        read_only_fields = ["id", "created_at", "updated_at"]