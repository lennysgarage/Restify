from wsgiref.validate import validator
from rest_framework import serializers
from .models import Like, MenuItem, Restaurant, Comment, Follow, RestaurantImage
from accounts.models import User
from django.shortcuts import get_object_or_404


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class CreateRestaurantSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    address = serializers.CharField(required=True)
    logo = serializers.ImageField(required=False)
    postal_code = serializers.CharField(required=True)
    phone_number = serializers.CharField(required=True)
    country_code = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Restaurant
        fields = ('name', 'address', 'logo', 'postal_code', 'phone_number', 'country_code', 'description', 'owner')

    def create(self, data):
        return Restaurant.objects.create(**data)


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'

class AddMenuItemSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    price = serializers.DecimalField(max_digits=5, decimal_places=2, required=True)
    photo = serializers.ImageField(required=False)
    restaurant = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = MenuItem
        fields = ('name', 'description', 'price', 'photo', 'restaurant')
    
    def create(self, data):
        return MenuItem.objects.create(**data)

class EditMenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ('name', 'description', 'price', 'photo')
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class AddCommentSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(required=False)
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    body = serializers.CharField(required=True)
    restaurant = serializers.HiddenField(default=None)
    
    class Meta:
        model = Comment
        fields = ('date', 'owner', 'body', 'restaurant')

    def create(self, data):
        comment = Comment.objects.create(
            body=data['body'],
            owner=data['owner'],
            restaurant = get_object_or_404(Restaurant, id=self.context.get('view').kwargs.get('restaurant_id'))
        )

        comment.save()

        return comment

class FollowSerializer(serializers.ModelSerializer):
    follower = serializers.HiddenField(default=serializers.CurrentUserDefault())
    restaurant = serializers.HiddenField(default=None)

    class Meta:
        model = Follow
        fields = ('follower', 'restaurant')
    
    def create(self, data):
        follow = Follow.objects.create(
            follower=data['follower'],
            restaurant = get_object_or_404(Restaurant, id=self.context.get('view').kwargs.get('restaurant_id'))
        )

        follow.save()

        return follow

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class LikeRestaurantSerializer(serializers.ModelSerializer):
    likedby = serializers.HiddenField(default=serializers.CurrentUserDefault())
    restaurant = serializers.HiddenField(default=None)

    class Meta:
        model = Like
        fields = ('likedby', 'restaurant')
    
    def create(self, data):
        likedby = Like.objects.create(
            likedby=data['likedby'],
            restaurant = get_object_or_404(Restaurant, id=self.context.get('view').kwargs.get('restaurant_id'))
        )

        likedby.save()

        return likedby

class AddPhotoSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(required=True)
    restaurant = serializers.HiddenField(default=None)

    class Meta:
        model = RestaurantImage
        fields = ('img', 'restaurant')

    def create(self, data):
        image = RestaurantImage.objects.create(
            img=data['img'],
            restaurant=get_object_or_404(Restaurant, id=self.context.get('view').kwargs.get('restaurant_id')),
        )

        image.save()

        return image

class RemovePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantImage
        fields = '__all__'
    