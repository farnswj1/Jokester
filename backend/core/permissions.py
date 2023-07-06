from rest_framework.permissions import BasePermission


class IsUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj


class HasAdministratorGroup(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.has_admin_group
