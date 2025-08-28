from rest_framework import permissions

class IsStudent(permissions.BasePermission):
    """
    Custom permission to only allow students to manage their notes.
    """

    def has_permission(self, request, view):
        return hasattr(request.user, "role") and request.user.role == "student"

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
