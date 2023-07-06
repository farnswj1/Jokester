from rest_framework.serializers import ModelSerializer
from rest_framework.fields import CharField, DateTimeField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from core.models import User


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        token['groups'] = list(user.groups.values_list('name', flat=True))
        return token


class RegisterUserSerializer(ModelSerializer):
    password = CharField(write_only=True)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')


class UserListSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')


class UserSerializer(ModelSerializer):
    date_joined = DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'date_joined')


class UserPasswordSerializer(ModelSerializer):
    password = CharField(write_only=True)

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('password',)


class UserIDAndNameOnlySerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')
