from rest_framework import serializers
from .models import Video


class ListCreateVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ["id", "title", "description", "thumbnail_url", "likes", "views", "updated_at", "created_at"]

class RetrieveUpdateDestroySerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ["title", "description", "video_url", "thumbnail_url", "course"]
