from rest_framework.permissions import BasePermission, SAFE_METHODS

# Roles allowed to change org-level configuration / delete records.
ADMIN_ROLES = {'Super Admin', 'Director', 'Laboratory Head', 'Quality Manager'}


class ReadOnlyOrAdmin(BasePermission):
    """Everyone authenticated can read; only admin roles can write."""
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user and request.user.is_authenticated
        return bool(request.user and request.user.is_authenticated
                    and getattr(request.user, 'role', '') in ADMIN_ROLES)


class IsAdminRole(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated
                    and getattr(request.user, 'role', '') in ADMIN_ROLES)
