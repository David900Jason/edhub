from rest_framework import generics, permissions
from .models import Todo
from .serializers import TodoCreateSerializer, TodoUpdateSerializer

class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "student"


class TodoListCreateView(generics.ListCreateAPIView):
    serializer_class = TodoCreateSerializer
    permission_classes = [IsStudent]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsStudent]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return TodoUpdateSerializer
        return TodoCreateSerializer
