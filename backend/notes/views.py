from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import NoteSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsStudent
from .models import Note

class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)


class NoteDetailView(APIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def delete(self, request, pk):
        try:
            note = Note.objects.get(pk=pk, user=request.user)
            note.delete()
            return Response({"message": "Note deleted successfully"}, status=status.HTTP_200_OK)
        except Note.DoesNotExist:
            return Response({"message": "Note not found"}, status=status.HTTP_404_NOT_FOUND)