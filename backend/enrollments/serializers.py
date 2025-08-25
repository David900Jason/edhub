from rest_framework import serializers
from .models import Enrollment
from courses.serializers import ListRetrieveCoursesSerializer


class EnrollmentSerializer(serializers.ModelSerializer):
    course = ListRetrieveCoursesSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = ["id", "course", "rating", "timestamp"]


