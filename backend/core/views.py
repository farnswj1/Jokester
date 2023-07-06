from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView
)
from rest_framework.permissions import SAFE_METHODS
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.serializers import (
    CustomTokenObtainPairSerializer,
    RegisterUserSerializer,
    UserListSerializer,
    UserSerializer,
    UserPasswordSerializer
)
from core.models import User
from core.permissions import IsUser
from core.filters import UserFilterSet


# Create your views here.
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomTokenRefreshView(TokenRefreshView):
    pass


class RegisterUserAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = []


class UserListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    filterset_class = UserFilterSet


class UserDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = super().get_permissions()
        user = self.request.user

        if not (user.is_authenticated and user.has_admin_group or self.request.method in SAFE_METHODS):
            permission_classes.append(IsUser())

        return permission_classes


class UserUpdatePasswordAPIView(UpdateAPIView):
    serializer_class = UserPasswordSerializer

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.pk)

    def get_permissions(self):
        permission_classes = super().get_permissions()
        permission_classes.append(IsUser())
        return permission_classes
