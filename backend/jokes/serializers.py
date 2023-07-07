from rest_framework.serializers import ModelSerializer
from rest_framework.fields import UUIDField, CharField
from core.serializers import UserSerializer, UserIDAndNameOnlySerializer
from jokes.models import Joke


class AddJokeSerializer(ModelSerializer):
    id = UUIDField(read_only=True)
    author = CharField(source='author.id', read_only=True)

    class Meta:
        model = Joke
        fields = '__all__'


class JokeListSerializer(ModelSerializer):
    author = UserIDAndNameOnlySerializer()

    class Meta:
        model = Joke
        exclude = ('body',)


class JokeSerializer(ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Joke
        fields = '__all__'
