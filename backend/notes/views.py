from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import NoteSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsStudent
from .models import Note

class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)


class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def update(self, request, pk):
        try:
            note = Note.objects.get(pk=pk, user=request.user)
            serializer = self.get_serializer(note, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Note.DoesNotExist:
            return Response({"message": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            note = Note.objects.get(pk=pk, user=request.user)
            note.delete()
            return Response({"message": "Note deleted successfully"}, status=status.HTTP_200_OK)
        except Note.DoesNotExist:
            return Response({"message": "Note not found"}, status=status.HTTP_404_NOT_FOUND)