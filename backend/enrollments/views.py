# Create your views here.
from rest_framework import generics, permissions
from rest_framework.views import APIView
from users.serializers import TeacherBriefSerializer, TeacherPublicSerializer
from users.views import TeacherDetailView
from .models import Enrollment
from users.models import User
from rest_framework.response import Response
from .serializers import EnrollmentSerializer

class EnrollmentListCreateView(generics.ListCreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EnrollmentDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EnrollmentSerializer
    lookup_field = "pk"

    def get_object(self):
        return Enrollment.objects.get(user=self.request.user, pk=self.kwargs["pk"])

class EnrollmentTeachersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # grab all teachers of courses where the user is enrolled
        teachers = User.objects.filter(
            courses__enrollments__user=request.user
        ).distinct()

        serializer = TeacherPublicSerializer(teachers, many=True, context={"request": request})
        return Response(serializer.data)