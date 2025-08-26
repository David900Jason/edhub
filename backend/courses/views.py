from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import Course
from .serializers import ListRetrieveCoursesSerializer, CreateCourseSerializer
from enrollments.models import Enrollment


class ListCreateCoursesView(ListCreateAPIView):
    filter_backends = [DjangoFilterBackend]
    filter_fields = ["teacher"]

    def get_permissions(self):
        if self.request.method.lower() == "post":
            return [IsAdminUser()]
        return [IsAuthenticated()]


    def get_serializer_class(self):
        if self.request.method.lower() == "post":
            return CreateCourseSerializer
        return ListRetrieveCoursesSerializer


    def create(self, request, *args, **kwargs):
        # Check User role
        if not request.user.is_staff:
            return Response({"error": "only teachers can create courses"}, status=400)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # assign the logged-in user as the teacher
        course = serializer.save(teacher=request.user)

        retrieve_serializer = ListRetrieveCoursesSerializer(course, context={"request": request})
        return Response(retrieve_serializer.data, status=201)

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            return Course.objects.all()
        if user.is_staff:
            return Course.objects.filter(teacher=user)
        return Course.objects.filter(is_published=True)


class RetrieveUpdateDestroyCoursesView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method.lower() in ["put", "patch"]:
            return CreateCourseSerializer
        return ListRetrieveCoursesSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Course.objects.all()
        if user.is_staff:
            return Course.objects.filter(teacher=user)
        return Course.objects.filter(is_published=True)

    def perform_update(self, serializer):
        user = self.request.user
        course = self.get_object()

        if user.is_superuser or (user.is_staff and course.teacher == user):
            serializer.save()
        else:
            raise PermissionDenied("You do not have permission to edit this course.")

    def perform_destroy(self, instance):
        user = self.request.user

        if user.is_superuser or (user.is_staff and instance.teacher == user):
            instance.delete()
        else:
            raise PermissionDenied("You do not have permission to delete this course.")


class Enroll(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        user = request.user
        if user.is_staff:
            return Response({"error": "only students can enroll"}, status=400)
        course = Course.objects.filter(id=pk).first()

        if len(Enrollment.objects.filter(user=user, course=course)) != 0:
            return Response({"error": "already enrolled"}, status=400)
        cash = user.wallet.balance

        if cash < course.price:
            return Response({"error": "insufficient funds"}, status=400)
        user.wallet.balance -= course.price
        user.wallet.save()

        new_en = Enrollment(user=user, course=course)
        new_en.save()
        return Response({"message": "student enrolled succesfully"}, status=201)


