from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from .serializers import BookUploadSerializer, PublicBookSerializer, PrivateBookSerializer, PublicCreateBookSerializer
from .models import Book


class ListCreateBookView(ListCreateAPIView):
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["course"]

    def get_serializer_class(self):
        if self.request.method.lower() == "post":
            return PublicCreateBookSerializer
        return PublicBookSerializer

    def get_permissions(self):
        if self.request.method.lower() == "post":
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Book.objects.all()
        elif self.request.user.is_staff:
            return Book.objects.filter(course__in=self.request.user.courses.all())
        enrolled_courses = self.request.user.enrollments.values_list("course", flat=True)
        return Book.objects.filter(course__in=enrolled_courses)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        book = serializer.save()

        retrieve_serializer = PublicBookSerializer(book, context={"request": request})
        return Response(retrieve_serializer.data, status=201)


class RetrieveUpdateDestroyBookView(RetrieveUpdateDestroyAPIView):
    serializer_class = PrivateBookSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            print("Admin detected")
            return Book.objects.all()
        elif self.request.user.is_staff:
            return Book.objects.filter(course__in=self.request.user.courses.all())
        enrolled_courses = self.request.user.enrollments.values_list("course", flat=True)
        return Book.objects.filter(course__in=enrolled_courses)

    def get_permissions(self):
        if self.request.method.lower() == "post":
            print(self.request.user.courses, self.request.user.is_staff)
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def perform_update(self, serializer):
        user = self.request.user
        book = self.get_object()

        # Teachers can only update books of their own courses
        if user.is_staff and book.course not in user.courses.all():
            raise PermissionDenied("You do not have permission to edit this book.")

        serializer.save()


# Upload new Book
class BookUploadView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookUploadSerializer


# Replace an existing Book
class BookReplaceView(APIView):
    queryset = Book.objects.all()
    serializer_class = BookUploadSerializer

    def patch(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = BookUploadSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)