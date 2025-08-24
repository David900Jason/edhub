from rest_framework.generics import ListAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import EnrollmentSerializer
from .models import Enrollment


class ListEnrollmentView(ListAPIView):
    def get_queryset(self):
        if self.request.user.is_staff:
            return Enrollment.objects.none()
        return Enrollment.objects.filter(user=self.request.user)

    permission_classes = [IsAuthenticated]
    serializer_class = EnrollmentSerializer


class RetrieveDestroyView(RetrieveDestroyAPIView):
    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user)
    
    permission_classes = [IsAuthenticated]
    serializer_class = Serializer
