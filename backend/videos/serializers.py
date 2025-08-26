from rest_framework import serializers
from .models import Video


class ListCreateVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ["id", "title", "description", "thumbnail_url", "likes", "views", "updated_at", "created_at", "course"]

class RetrieveUpdateDestroySerializer(serializers.ModelSerializer):
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
        model = Video
        fields = ["id", "title", "description", "video_url", "thumbnail_url", "likes", "views", "updated_at", "created_at", "course"]
