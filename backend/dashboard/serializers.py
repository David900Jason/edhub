import base64
from rest_framework import serializers
from payments.models import Wallet, Payment
from users.models import User
from courses.models import Course

class StudentAdminOnlyListSerializer(serializers.ModelSerializer):
    enrolled_courses = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "email",
            "phone_number",
            "parent_number",
            "birth_date",
            "city",
            "is_active",
            "last_login",
            "created_at",
            "updated_at",
            "enrolled_courses",
        ]

    def get_enrolled_courses(self, obj):
        return obj.enrollments.values_list("course__title", flat=True)

class TeacherAdminOnlyListSerializer(serializers.ModelSerializer):
    created_courses = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "email",
            "phone_number",
            "parent_number",
            "birth_date",
            "city",
            "is_active",
            "is_verified",
            "last_login",
            "created_at",
            "updated_at",
            "profile_img",
            "created_courses",
        ]

    def get_created_courses(self, obj):
        # get all course titles for this teacher
        return list(Course.objects.filter(teacher=obj).values_list("title", flat=True))


class UserAdminToggleActiveStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["is_active"]

class UserAdminToggleVerifiedStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["is_verified"]

class StudentsWalletsAdminSerializer(serializers.ModelSerializer):
    student = serializers.SerializerMethodField()

    class Meta:
        model = Wallet
        fields = ["id", "student", "balance", "currency", "created_at"]

    def get_student(self, obj):
        return {
            "full_name": obj.user.full_name,
            "phone_number": obj.user.phone_number,
            "parent_number": obj.user.parent_number,
        }

class AdminPaymentRecordsSerializer(serializers.ModelSerializer):
    user_wallet = serializers.SerializerMethodField(read_only=True)
    wallet = serializers.PrimaryKeyRelatedField(
        queryset=Wallet.objects.all(), write_only=True, required=True
    )

    class Meta:
        model = Payment
        fields = [
            "id",
            "code",
            "payment_id",
            "amount",
            "wallet",       # required on create
            "user_wallet",  # returned in response
            "is_used",
            "created_at",
        ]

    def get_user_wallet(self, obj):
        if obj.wallet:
            return {
                "id": obj.wallet.id,
                "full_name": obj.wallet.user.full_name,
            }
        return None

