from rest_framework import serializers
from courses.models import Course
from courses.serializers import PrivateCourse
from qna.serializers import QuestionSerializer
from .models import Video


class ListCreateVideoSerializer(serializers.ModelSerializer):
    course = serializers.SerializerMethodField(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source="course",
        write_only=True,
    )
    video_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()

    def get_course(self, obj):
        return {
            "id": str(obj.course.id),
            "title": obj.course.title
        }
        
    def get_video_url(self, obj):
        request = self.context.get('request')
        if obj.video_url:
            return request.build_absolute_uri(obj.video_url.url) if request else obj.video_url.url
        return None
        
    def get_thumbnail_url(self, obj):
        request = self.context.get('request')
        if obj.thumbnail_url:
            return request.build_absolute_uri(obj.thumbnail_url.url) if request else obj.thumbnail_url.url
        return None

    class Meta:
        model = Video
        fields = ["id", "title", "description", "thumbnail_url", "likes", "views", "updated_at", "created_at", "course", "course_id", "video_url"]

class RetrieveUpdateDestroySerializer(serializers.ModelSerializer):
    course = serializers.SerializerMethodField(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source="course",
        write_only=True,
    )
    video_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()
    questions = QuestionSerializer(many=True, read_only=True)

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

    def get_course(self, obj):
        return {
            "id": str(obj.course.id),
            "title": obj.course.title
        }
        
    def get_video_url(self, obj):
        request = self.context.get('request')
        if obj.video_url:
            return request.build_absolute_uri(obj.video_url.url) if request else obj.video_url.url
        return None
        
    def get_thumbnail_url(self, obj):
        request = self.context.get('request')
        if obj.thumbnail_url:
            return request.build_absolute_uri(obj.thumbnail_url.url) if request else obj.thumbnail_url.url
        return None

    class Meta:
        model = Video
        fields = ["id", "title", "description", "video_url", "thumbnail_url", "likes", "views", "updated_at", "created_at", "course", "course_id", "questions"]

class VideoUploadSerializer(serializers.ModelSerializer):
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source="course",   # this ensures we save into `course`
        write_only=True,
    )
    course = PrivateCourse(read_only=True)  # show full course in response

    class Meta:
        model = Video
        fields = [
            "id", "title", "thumbnail_url", "video_url",
            "created_at", "course_id", "course", "description"
        ]
        read_only_fields = ["id", "created_at"]

class VideoReplaceSerializer(serializers.ModelSerializer):
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source="course",
        required=False,
    )
    course = PrivateCourse(read_only=True)

    class Meta:
        model = Video
        fields = ["title", "thumbnail_url", "video_url", "course", "course_id"]

    def create(self, validated_data):
        new_video = Video.objects.create(**validated_data)
        return new_video



