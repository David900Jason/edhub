# users/views.py
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from users.models import User
from rest_framework import generics, status
from .serializers import (
    AdminPaymentRecordsSerializer,
    StudentAdminOnlyListSerializer,
    StudentsWalletsAdminSerializer,
    TeacherAdminOnlyListSerializer,
    UserAdminToggleActiveStateSerializer,
    UserAdminToggleVerifiedStateSerializer,
)
from payments.models import Payment, Wallet
from users.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

class StudentAdminOnlyListView(generics.ListAPIView):
    serializer_class = StudentAdminOnlyListSerializer
    permission_classes = [IsAdminUser]  # only admins can access

    def get_queryset(self):
        return User.objects.filter(role="student")

class TeacherAdminOnlyListView(generics.ListAPIView):
    serializer_class = TeacherAdminOnlyListSerializer
    permission_classes = [IsAdminUser]  # only admins can access

    def get_queryset(self):
        return User.objects.filter(role="teacher")

class UserAdminToggleActiveState(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserAdminToggleActiveStateSerializer
    permission_classes = [IsAdminUser]  # only admins can access

    def get_object(self):
        return User.objects.get(pk=self.kwargs["pk"])

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        if user.role == "admin":
            raise PermissionDenied("You do not have permission to edit this user.")

        user.is_active = not user.is_active
        user.save()

        if user.is_active:
            return Response({ "message": "User activated successfully." })
        else:
            return Response({ "message": "User deactivated successfully." })

class UserAdminToggleVerifiedState(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserAdminToggleVerifiedStateSerializer
    permission_classes = [IsAdminUser]  # only admins can access

    def get_object(self):
        return User.objects.get(pk=self.kwargs["pk"])

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        if user.role == "admin":
            raise PermissionDenied("You do not have permission to edit this user.")

        user.is_verified = not user.is_verified
        user.save()

        if user.is_verified:
            return Response({ "message": "User verified successfully." })
        else:
            return Response({ "message": "User unverified successfully." })

class StudentsWalletsAdminView(APIView):
    serializer_class = StudentsWalletsAdminSerializer
    permission_classes = [IsAdminUser]  # only admins can access

    def get(self, request):
        wallets = Wallet.objects.filter(user__role="student")
        serializer = StudentsWalletsAdminSerializer(wallets, many=True)
        return Response(serializer.data)

class StudentWalletAdminUpdateView(generics.UpdateAPIView):
    serializer_class = StudentsWalletsAdminSerializer
    permission_classes = [IsAdminUser]
    queryset = Wallet.objects.filter(user__role="student")

    def get_object(self):
        wallet = get_object_or_404(Wallet, id=self.kwargs["pk"])  # <- changed here

        if wallet.user.role != "student":
            raise PermissionDenied("You do not have permission to edit this wallet.")
        
        return wallet

class AdminPaymentRecordsView(generics.ListAPIView):
    serializer_class = AdminPaymentRecordsSerializer
    permission_classes = [IsAdminUser]  # only admins can access

    def get_queryset(self):
        return Payment.objects.all().order_by("-created_at")

class AdminPaymentRecordsCreateView(generics.CreateAPIView):
    serializer_class = AdminPaymentRecordsSerializer
    permission_classes = [IsAdminUser]  # only admins can access

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payment = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

