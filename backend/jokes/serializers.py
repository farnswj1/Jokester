from rest_framework.serializers import ModelSerializer
from rest_framework.fields import UUIDField, CharField, BooleanField
from core.serializers import UserIDAndNameOnlySerializer
from jokes.models import Joke


class AddJokeSerializer(ModelSerializer):
    id = UUIDField(read_only=True)
    author = CharField(source='author.id', read_only=True)

    class Meta:
        model = Joke
        exclude = ('liked_by',)


class JokeListSerializer(ModelSerializer):
    author = UserIDAndNameOnlySerializer()

    class Meta:
        model = Joke
        exclude = ('body', 'liked_by')


class JokeSerializer(ModelSerializer):
    author = UserIDAndNameOnlySerializer(read_only=True)

    class Meta:
        model = Joke
        fields = ('id', 'author', 'title', 'body', 'total_likes')


class LikeJokeSerializer(ModelSerializer):
    liked_by = BooleanField(required=True, write_only=True)

    def update(self, instance, validated_data):
        user = validated_data.pop('user')

        if validated_data['liked_by']:
            instance.liked_by.add(user)
        else:
            instance.liked_by.remove(user)

        return instance

    class Meta:
        model = Joke
        fields = ('id', 'liked_by')
