# users/serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User

class TeacherPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "full_name", "email", "phone_number", "parent_number", "city"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "full_name", "email", "phone_number", "parent_number", "city", "birth_date", "role", "is_active", "is_verified", "last_login", "created_at", "updated_at"]
        read_only_fields = ["is_staff", "is_superuser", "groups", "user_permissions"]

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "full_name", "email", "password", "role", "phone_number", "parent_number", "city", "birth_date"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserActivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "is_active"]
        read_only_fields = ["id", "email"]

    def update(self, instance, validated_data):
        instance.is_active = True
        instance.save()
        return instance

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        # First, try to get the user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        # Check if the user is active
        if not user.is_active:
            raise serializers.ValidationError("This account is inactive")

        # Verify the password
        if not user.check_password(password):
            raise serializers.ValidationError("Invalid email or password")

        # Authenticate the user
        user = authenticate(
            request=self.context.get("request"),
            email=email,
            password=password
        )

        if not user:
            raise serializers.ValidationError("Authentication failed")

        data["user"] = user
        return data

class ForgotPasswordSerializer(serializers.Serializer):
    identifier = serializers.CharField()  # email or phone number
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        identifier = data.get("identifier")
        try:
            # Try email first
            user = User.objects.get(email=identifier)
        except User.DoesNotExist:
            try:
                # Then try phone_number
                user = User.objects.get(phone_number=identifier)
            except User.DoesNotExist:
                raise serializers.ValidationError("User not found with this email or phone number")
        data["user"] = user
        return data

    def save(self, **kwargs):
        user = self.validated_data["user"]
        new_password = self.validated_data["new_password"]
        user.set_password(new_password)
        user.save()
        return user
