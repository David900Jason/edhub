from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ListCreateVideoSerializer, RetrieveUpdateDestroySerializer
from .models import Video, ViewSession, LikeReaction
from courses.models import Course


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
            print("Admin detected")
            return Video.objects.all()
        elif self.request.user.is_staff:
            return Video.objects.filter(course__in=self.request.user.courses)
        enrolled_courses = self.request.user.enrollments.values_list("course", flat=True)
        return Video.objects.filter(course__in=enrolled_courses)

    def get_serializer(self):
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
        return super().retrieve(request)

    def get_queryset(self):
        if self.request.user.is_superuser:
            print("Admin detected")
            return Video.objects.all()
        elif self.request.user.is_staff:
            return Video.objects.filter(course__in=self.request.user.courses)
        enrolled_courses = self.request.user.enrollments.values_list("course", flat=True)
        return Video.objects.filter(course__in=enrolled_courses)

    def get_permissions(self):
        if self.request.method.lower() == "post":
            print(self.request.user.courses, self.request.user.is_staff)
            return [IsAdminUser()]
        return [IsAuthenticated()]


class LikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, video_id):
        video = Video.objects.get(id=video_id)
        like, created = LikeReaction.objects.get_or_create(student=request.user, video=video)
        if created:
            return Response({"message": "Video liked"}, status=status.HTTP_201_CREATED)
        return Response({"message": "Already liked"}, status=status.HTTP_200_OK)

    def delete(self, request, video_id):
        """Unlike a video"""
        try:
            like = LikeReaction.objects.get(student=request.user, video_id=video_id)
            like.delete()
            return Response({"message": "Like removed"}, status=status.HTTP_204_NO_CONTENT)
        except Like.DoesNotExist:
            return Response({"message": "You have not liked this video"}, status=status.HTTP_400_BAD_REQUEST)


