from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ListCreateVideoSerializer, RetrieveUpdateDestroySerializer
from .models import Video
from courses.models import Course


class ListCreateVideoView(ListCreateAPIView):
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["course"]
    serializer_class = ListCreateVideoSerializer

    def get_permissions(self):
        if self.request.method.lower() == "post":
            print(self.request.user.courses, self.request.user.is_staff)
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_queryset(self):
        if self.request.user.is_superuser:
            print("Admin detected")
            return Video.objects.all()
        elif self.request.user.is_staff:
            return Video.objects.filter(course__in=self.request.user.courses)
        enrolled_courses = self.request.user.enrollments.values_list("course", flat=True)
        return Video.objects.filter(course__in=enrolled_courses)

