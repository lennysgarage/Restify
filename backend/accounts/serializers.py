from wsgiref.validate import validator
from rest_framework import serializers
from .models import Notification, User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# users/
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

# profile/edit
class EditUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'password', 'country_code', 'phone_number', 'address', 'profile_photo')

# profile/view
class ViewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', 'country_code', 'phone_number', 'address', 'profile_photo')

# login/
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD

# register/
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True, validators=[validate_password])
    password2 = serializers.CharField(required=True, write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    country_code = serializers.CharField(required=True)
    phone_number = serializers.CharField(required=True)
    profile_photo = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'password', 'password2', 'email', 'country_code', 'phone_number', 'profile_photo')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Paswords do not match.'})
        return attrs

    def create(self, data):
        try:
            user = User.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                country_code=data['country_code'],
                phone_number=data['phone_number'],
                profile_photo=data['profile_photo']
            )
        except KeyError:
            user = User.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                country_code=data['country_code'],
                phone_number=data['phone_number']
            )

        user.set_password(data['password']);
        user.save()

        return user

# notifications
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

# notification/add
class AddNotificationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    date = serializers.DateTimeField(required=True)
    title = serializers.CharField(required=True)
    content = serializers.CharField(required=True)

    class Meta:
        model = Notification
        fields = ('user', 'date', 'title', 'content')

    def create(self, data):
        return Notification.objects.create(**data)
