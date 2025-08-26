from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ListCreateVideoSerializer, RetrieveUpdateDestroySerializer
from .models import Video, ViewSession, LikeReaction
from books.models import Book

class ListCreateVideoView(ListCreateAPIView):
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["course"]

    def get_permissions(self):
        if self.request.method.lower() == "post":
            print(self.request.user.courses, self.request.user.is_staff)
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Video.objects.all()
        elif self.request.user.is_staff:
            return Video.objects.filter(course__in=self.request.user.courses.all())
        enrolled_courses = self.request.user.enrollments.values_list("course", flat=True)
        return Video.objects.filter(course__in=enrolled_courses)

    def get_serializer_class(self):
        if self.request.method.lower() == "post":
            return RetrieveUpdateDestroySerializer
        return ListCreateVideoSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        video = serializer.save()

        retrieve_serializer = ListCreateVideoSerializer(video, context={"request": request})
        return Response(retrieve_serializer.data, status=201)


class RetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = RetrieveUpdateDestroySerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user
        instance.views += 1
        instance.save()
        new_view = ViewSession(video=instance, student=user)
        new_view.save()

        # Get related videos with only title and id
        related_videos = Video.objects.filter(course=instance.course).values('id', 'title')

        # Get the main video data
        serializer = self.get_serializer(instance, context={"request": request})
        response_data = serializer.data

        # Add related videos to the response
        response_data['related_videos'] = list(related_videos)

        # Get related books with only title and id
        books = Book.objects.filter(video=instance).values('id', 'title')
        response_data['books'] = list(books)

        return Response(response_data)

    def get_queryset(self):
        if self.request.user.is_superuser:
            print("Admin detected")
            return Video.objects.all()
        elif self.request.user.is_staff:
            return Video.objects.filter(course__in=self.request.user.courses.all())
        enrolled_courses = self.request.user.enrollments.values_list("course", flat=True)
        return Video.objects.filter(course__in=enrolled_courses)

    def get_permissions(self):
        if self.request.method.lower() == "post":
            print(self.request.user.courses, self.request.user.is_staff)
            return [IsAdminUser()]
        return [IsAuthenticated()]


class LikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        video = Video.objects.get(id=pk)
        like, created = LikeReaction.objects.get_or_create(student=request.user, video=video)

        if created:
            video.likes += 1
            video.save()
            return Response({"message": "Video liked"}, status=status.HTTP_201_CREATED)
        return Response({"message": "Already liked"}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        """Unlike a video"""
        try:
            like = LikeReaction.objects.get(student=request.user, video_id=pk)
            like.delete()
            video.likes -= 1
            video.save()
            return Response({"message": "Like removed"}, status=status.HTTP_204_NO_CONTENT)
        except LikeReaction.DoesNotExist:
            return Response({"message": "You have not liked this video"}, status=status.HTTP_400_BAD_REQUEST)


