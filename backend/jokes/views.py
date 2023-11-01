from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView
)
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from jokes.serializers import (
    JokeSerializer,
    AddJokeSerializer,
    JokeListSerializer,
    LikeJokeSerializer
)
from jokes.permissions import IsAuthor
from jokes.filters import JokeFilterSet
from jokes.models import Joke


# Create your views here.
class JokeCreateAPIView(CreateAPIView):
    queryset = Joke.objects.all()
    serializer_class = AddJokeSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class JokeListAPIView(ListAPIView):
    queryset = Joke.objects.all()
    serializer_class = JokeListSerializer
    filterset_class = JokeFilterSet


class JokeDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Joke.objects.all()
    serializer_class = JokeSerializer

    def get_permissions(self):
        permission_classes = super().get_permissions()

        if self.request.method not in SAFE_METHODS:
            permission_classes.append(IsAuthor())

        return permission_classes

    def get(self, request, pk, *args, **kwargs):
        response = super().get(request, pk, *args, **kwargs)
        user = self.request.user
        liked_by = user.is_authenticated and user.liked.filter(pk=pk).exists()
        response.data['liked_by'] = liked_by
        return response


class LikeJokeAPIView(UpdateAPIView):
    queryset = Joke.objects.all()
    serializer_class = LikeJokeSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class RandomJokeAPIView(APIView):
    def get_queryset(self):
        return Joke.objects.order_by('?')

    def get(self, request, format=None):
        joke = self.get_queryset().first()
        serializer = JokeSerializer(joke)
        return Response(serializer.data)
