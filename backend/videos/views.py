import os
from rest_framework import status, generics, parsers, permissions
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend

from api import settings
from books.serializers import RelatedBooksSerializer
from books.models import Book
from .serializers import ListCreateVideoSerializer, RetrieveUpdateDestroySerializer, VideoUploadSerializer
from .models import Video, ViewSession, LikeReaction

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


class UploadChunkView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        upload_id = request.data.get("upload_id")
        chunk_index = request.data.get("chunk_index")
        file = request.FILES.get("file")

        if not upload_id or chunk_index is None or not file:
            return Response({"error": "Missing upload data"}, status=400)

        upload_path = os.path.join(settings.CHUNKS_DIR, upload_id)
        os.makedirs(upload_path, exist_ok=True)

        chunk_filename = os.path.join(upload_path, f"chunk_{chunk_index}")
        with open(chunk_filename, "wb+") as dest:
            for c in file.chunks():
                dest.write(c)

        return Response({"message": f"Chunk {chunk_index} uploaded"})


class MergeChunksView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        upload_id = request.data.get("upload_id")
        title = request.data.get("title")
        description = request.data.get("description")
        course_id = request.data.get("course_id")
        thumbnail_url = request.data.get("thumbnail_url")

        if not upload_id or not title or not course_id:
            return Response({"error": "Missing upload data"}, status=400)

        # Merge chunks
        # MergeChunksView
        upload_dir = os.path.join(settings.CHUNKS_DIR, upload_id)  # directory only
        final_path = os.path.join(settings.MEDIA_ROOT, "videos", f"{upload_id}.mp4")

        os.makedirs(os.path.dirname(final_path), exist_ok=True)  # make sure videos/ exists

        with open(final_path, "wb") as final_file:
            for chunk_name in sorted(os.listdir(upload_dir), key=lambda x: int(x.split("_")[1])):
                with open(os.path.join(upload_dir, chunk_name), "rb") as f:
                    final_file.write(f.read())

        # Save video object
        video = Video.objects.create(
            title=title,
            description=description,
            course_id=course_id,
            thumbnail_url=thumbnail_url,
            video_url=os.path.join("videos", f"{upload_id}.mp4")
        )

        return Response(VideoUploadSerializer(video).data, status=status.HTTP_201_CREATED)


class VideoReplaceView(generics.UpdateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoUploadSerializer
    parser_classes = [MultiPartParser, FormParser]
    http_method_names = ["patch"]

    def get_serializer(self, *args, **kwargs):
        kwargs["partial"] = True
        return super().get_serializer(*args, **kwargs)
