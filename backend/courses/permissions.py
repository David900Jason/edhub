from rest_framework.permissions import BasePermission

class IsAdminUserOnly(BasePermission):
    """
    Allow access only to users with 'Admin' role.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "admin"