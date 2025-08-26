from rest_framework.generics import ListAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import EnrollmentSerializer, PrivateEnrollmentSerializer
from .models import Enrollment


class ListEnrollmentView(ListAPIView):
    def get_queryset(self):
        if self.request.user.is_superuser:
            return Enrollment.objects.all()
        elif self.request.user.is_staff:
            return Enrollment.objects.none()
        return Enrollment.objects.filter(user=self.request.user)

    permission_classes = [IsAuthenticated]
    serializer_class = EnrollmentSerializer


class RetrieveDestroyView(RetrieveDestroyAPIView):
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user
        wallet = user.wallet

        wallet.balance += (instance.course.price - instance.course.discount)
        wallet.save()
        self.perform_destroy(instance)
        return Response(
            {"detail": "Enrollment removed successfully."},
            status=204,
        )

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Enrollment.objects.all()
        elif self.request.user.is_staff:
            return Enrollment.objects.none()
        return Enrollment.objects.filter(user=self.request.user)

    permission_classes = [IsAuthenticated]
    serializer_class = PrivateEnrollmentSerializer
