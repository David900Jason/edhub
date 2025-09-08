from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView, status
from django_filters.rest_framework import DjangoFilterBackend
from users.permissions import IsAdminOrTeacher
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
        if not request.user.is_staff and not request.user.is_superuser:
            return Response({"error": "only teachers can create courses"}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if serializer.validated_data["price"] == 0:
            serializer.validated_data["is_paid"] = False
        else:
            serializer.validated_data["is_paid"] = True

        # assign the logged-in user as the teacher
        course = serializer.save(teacher=request.user)

        retrieve_serializer = ListRetrieveCoursesSerializer(course, context={"request": request})
        return Response(retrieve_serializer.data, status=status.HTTP_201_CREATED)

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
        return Course.objects.all()

    def perform_update(self, serializer):
        user = self.request.user
        course = self.get_object()

        if user.is_superuser or (user.is_staff and course.teacher == user):
            serializer.save()
        else:
            raise PermissionDenied("You do not have permission to edit this course.")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user

        if user.is_superuser or (user.is_staff and instance.teacher == user):
            self.perform_destroy(instance)
            return Response({"message": "Course deleted successfully."}, status=status.HTTP_200_OK)
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
            return Response({"error": "Already enrolled"}, status=400)
        cash = user.wallet.balance

        if cash < course.price:
            return Response({"error": "Insufficient funds"}, status=400)

        total_price = course.price - course.discount
        user.wallet.balance -= total_price
        user.wallet.save()

        new_en = Enrollment(user=user, course=course, amount_paid=total_price)
        new_en.save()
        return Response({"message": "Student enrolled successfully"}, status=201)


