from rest_framework import permissions
from rest_framework import parsers
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend

from books.serializers import RelatedBooksSerializer
from .serializers import ListCreateVideoSerializer, RetrieveUpdateDestroySerializer, VideoReplaceSerializer, VideoUploadSerializer
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
        parser_classes = [parsers.MultiPartParser, parsers.FormParser]

        retrieve_serializer = ListCreateVideoSerializer(video, context={"request": request})
        return Response(retrieve_serializer.data, status=201)


class RetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = RetrieveUpdateDestroySerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user

        # Get the main video data
        serializer = self.get_serializer(instance, context={"request": request})
        response_data = serializer.data

        if not user.is_staff:
            instance.views += 1
            instance.save()
            new_view = ViewSession(video=instance, student=user)
            new_view.save()

            # Related videos
            related_videos = Video.objects.filter(course=instance.course).values("id", "title")
            response_data["related_videos"] = list(related_videos)

            # Related books in video id
            related_books = Book.objects.filter(video=instance)
            response_data["books"] = RelatedBooksSerializer(
                related_books, many=True, context={"request": request}
            ).data

            return Response(response_data)

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


class VideoUploadView(generics.CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoUploadSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    permission_classes = [permissions.IsAuthenticated]


class VideoReplaceView(generics.UpdateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoUploadSerializer
    parser_classes = [MultiPartParser, FormParser]  # ✅ needed for file uploads
    http_method_names = ["patch"]  # ✅ only allow partial update (PATCH)

    def get_serializer(self, *args, **kwargs):
        # ✅ ensure partial updates don’t require all fields
        kwargs["partial"] = True
        return super().get_serializer(*args, **kwargs)
