# support/serializers.py
from rest_framework import serializers
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "message", "type", "created_at"]
        extra_kwargs = {
            "name": {"required": True},
            "email": {"required": True},
        }
        read_only_fields = ["id", "created_at"]
