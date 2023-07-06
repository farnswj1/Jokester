from rest_framework.serializers import ModelSerializer
from core.serializers import UserSerializer, UserIDAndNameOnlySerializer
from jokes.models import Joke


class AddJokeSerializer(ModelSerializer):
    class Meta:
        model = Joke
        fields = ('title', 'body')


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
