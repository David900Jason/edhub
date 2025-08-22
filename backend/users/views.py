# users/views.py
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser
from django.utils import timezone

from users.permissions import IsAdminOrTeacher
from .serializers import LoginSerializer, UserSerializer, UserCreateSerializer, TeacherPublicSerializer, ForgotPasswordSerializer
from .models import User

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        queryset = super().get_queryset()
        role = self.request.query_params.get("role")
        if role:
            queryset = queryset.filter(role=role)
        return queryset

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]  # only authenticated users
    serializer_class = UserSerializer  # create/import your serializer

    def get_queryset(self):
        user = self.request.user
        role = self.request.query_params.get("role")

        if not role:
            raise PermissionDenied("You must specify ?role=student or ?role=teacher")

        # Teacher can only see students
        if user.role == "teacher":
            if role != "student":
                raise PermissionDenied("Teachers can only view students.")
            return User.objects.filter(role="student")

        # Student can only see teachers
        elif user.role == "student":
            if role != "teacher":
                raise PermissionDenied("Students can only view teachers.")
            return User.objects.filter(role="teacher")

        # Admins can see anyone (optional)
        elif user.role == "admin":
            return User.objects.filter(role=role)

        else:
            raise PermissionDenied("Your role is not allowed to view users.")

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "pk"  # UUID lookup
    permission_classes = [permissions.IsAuthenticated]  # only logged-in students can access

    def get_queryset(self):
        """
            Restrict teachers and admins to only viewing user by ID
        """
        user = self.request.user
        if user.role == "teacher" or user.role == "admin":
            return super().get_queryset()
        return User.objects.none()  # deny access for non-teachers and non-admins

class TeacherDetailView(generics.RetrieveAPIView):
    queryset = User.objects.filter(role="teacher")
    serializer_class = TeacherPublicSerializer
    lookup_field = "pk"  # UUID lookup
    permission_classes = [permissions.IsAuthenticated]  # only logged-in students can access

    def get_queryset(self):
        """Restrict students to only viewing teachers"""
        user = self.request.user
        if user.role == "student" or user.role == "admin":
            return super().get_queryset()
        return User.objects.none()  # deny access for non-students

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer  # just to validate email & password

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        if user is not None:
            user.last_login = timezone.now()
            user.save(update_fields=["last_login"])
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Login successful"
            }, status=status.HTTP_200_OK)

        return Response({
            "message": "Invalid email or password"
        }, status=status.HTTP_401_UNAUTHORIZED)

class UserActivateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    lookup_field = "pk"  # works with UUID as well
    permission_classes = [IsAdminUser]  # only admins can activate users

    def update(self, request, *args, **kwargs):
        try:
            user = self.get_object()
            if user.is_active:
                return Response(
                    {"message": f"User is already active"},
                    status=status.HTTP_200_OK
                )
            
            user.is_active = True
            user.save(update_fields=["is_active"])
            return Response(
                {"message": f"User activated successfully"},
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

class UserDeactivateView(APIView):
    permission_classes = [IsAdminOrTeacher]

    def delete(self, request, pk):
        """
        Soft delete (deactivate) a student user.
        """
        user = generics.get_object_or_404(User, pk=pk)

        if user.role != "student":
            return Response(
                {"detail": "❌ Only students can be deactivated."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not user.is_active:
            return Response(
                {"detail": "⚠️ User is already inactive."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.is_active = False
        user.save()

        return Response(
            {"detail": f"✅ User {user.email} has been successfully deactivated."},
            status=status.HTTP_200_OK
        )

class ForgotPasswordView(generics.GenericAPIView):
    serializer_class = ForgotPasswordSerializer
    permission_classes = []  # allow anyone

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Password has been reset successfully"}, status=status.HTTP_200_OK)

class UserMeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
