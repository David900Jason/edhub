from rest_framework.permissions import BasePermission

class IsAdminOrTeacher(BasePermission):
    """
    Allow access only if user is teacher or admin.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.role in ["teacher", "admin"]
        )
