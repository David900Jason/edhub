from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import Course
from .serializers import ListRetrieveCoursesSerializer, CreateCourseSerializer


class ListCreateCoursesView(ListCreateAPIView):
    def get_permissions(self):
        if self.request.method.lower() == "post":
            return [IsAdminUser()]
        return [IsAuthenticated()]


    def get_serializer_class(self):
        if self.request.method.lower() == "post":
            return CreateCourseSerializer
        return ListRetrieveCoursesSerializer


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        course = serializer.save()

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


