from rest_framework.permissions import BasePermission


class IsAuthor(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user

        if user.is_staff or user.is_superuser or user.has_admin_group:
            return True

        return request.user == obj.author
