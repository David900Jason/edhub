# users/serializers.py
from django.db.models import Sum
from rest_framework import serializers
from django.contrib.auth import authenticate

from courses.models import Course
from enrollments.models import Enrollment
from payments.models import Wallet
from qna.models import Question
from videos.models import Video
from .models import User

class TeacherPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "full_name", "email", "phone_number", "parent_number", "city", "profile_img"]


class TeacherBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "full_name"]


class StudentBriefSerializer(serializers.ModelSerializer):
    enrolled_courses = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["full_name", "email", "phone_number", "parent_number", "city", "profile_img", "birth_date", "role", "created_at", "enrolled_courses"]

    def get_enrolled_courses(self, obj):
        request = self.context.get("request")
        user = request.user

        # If teacher: only return courses taught by them
        if user.role == "teacher":
            return list(
                obj.enrollments.filter(course__teacher=user)
                .values_list("course__title", flat=True)
            )
        # Otherwise (admin), return all enrolled courses
        return list(obj.enrollments.values_list("course__title", flat=True))


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "full_name", "profile_img", "phone_number", "parent_number", "city", "birth_date", "role", "is_active", "is_verified", "last_login", "created_at", "updated_at"]
        read_only_fields = ["is_staff", "is_superuser", "groups", "user_permissions"]

class UserDashboardSerializer(serializers.Serializer):
    dashboard_details = serializers.SerializerMethodField()

    def get_dashboard_details(self, obj: User):
        """Role-based dashboard stats"""
        role = obj.role
        data = {}

        if role == "student":
            wallet, _ = Wallet.objects.get_or_create(user=obj)
            data = {
                "enrolled_courses": Enrollment.objects.filter(user=obj).count(),
                "questions_asked": Question.objects.filter(student=obj).count(),
                "wallet_balance": wallet.balance,
                "wallet_currency": wallet.currency,
                "average_score": 0,
            }

        if role == "teacher":
            total_revenue = (
                Enrollment.objects.filter(course__teacher=obj)
                .aggregate(total=Sum("amount_paid"))["total"] or 0
            )
            data = {
                "enrolled_students": Enrollment.objects.filter(course__teacher=obj).count(),
                "total_revenue": total_revenue,
                "videos_uploaded": Video.objects.filter(course__teacher=obj).count(),
                "currency": Course.objects.filter(teacher=obj).first().currency
                if Course.objects.filter(teacher=obj).exists() else None,
                "average_score": 0,
            }
        return data

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
