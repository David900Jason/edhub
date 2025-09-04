# users/views.py
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .serializers import LoginSerializer, StudentBriefSerializer, UserDashboardSerializer, UserSerializer, UserCreateSerializer, TeacherPublicSerializer
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

class UserMeView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "pk"

    def get_object(self):
        return self.request.user

class UserListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StudentBriefSerializer

    def get_queryset(self):
        user = self.request.user
        role = self.request.query_params.get("role")

        if not role and not user.is_superuser:
            raise PermissionDenied("You must specify ?role=student or ?role=teacher")

        # Teacher: only see students enrolled in their own courses
        if user.role == "teacher":
            if role == "student":
                raise PermissionDenied("Teachers can only view students.")
            return User.objects.filter(
                enrollments__course__teacher=user
            ).distinct()

        # Student: only see teachers
        elif user.role == "student":
            if role == "teacher":
                raise PermissionDenied("Students can only view teachers.")
            return User.objects.filter(role="teacher").distinct()

        # Admin: can see anyone
        elif user.role == "admin":
            if role:
                return User.objects.filter(role=role).distinct()
            return User.objects.all()

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


class UserDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserDashboardSerializer(request.user, context={"request": request})
        return Response(serializer.data)


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

class TeacherListView(generics.ListAPIView):
    queryset = User.objects.filter(role="teacher")
    serializer_class = TeacherPublicSerializer
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

        if not user: 
            return Response({
                "message": "Invalid email or password"
            }, status=status.HTTP_401_UNAUTHORIZED)

        user.last_login = timezone.now()
        user.save(update_fields=["last_login"])

        refresh = RefreshToken.for_user(user)
        refresh_token = str(refresh)
        access_token = str(refresh.access_token)

        response = Response({
            "access": access_token,
            "refresh": refresh_token,
            "message": "Login successful"
        })

        return response