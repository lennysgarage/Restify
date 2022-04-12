from rest_framework import serializers
from .models import Blog, LikeBlog
from restaurants.models import Like
from django.shortcuts import get_object_or_404


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

class AddBlogSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(required=False)
    header = serializers.CharField(required=True)
    subtext = serializers.CharField(required=True)
    body = serializers.CharField(required=True)
    restaurant = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Blog
        fields = ('date', 'header', 'subtext', 'body', 'restaurant')

    def create(self, data):
        return Blog.objects.create(**data)

class RemoveBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'


class LikesBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeBlog
        fields = '__all__'

class LikeBlogSerializer(serializers.ModelSerializer):
    likedby = serializers.HiddenField(default=serializers.CurrentUserDefault())
    blog = serializers.HiddenField(default=None)

    class Meta:
        model = LikeBlog
        fields = ('likedby', 'blog')
    
    def create(self, data):
        like = LikeBlog.objects.create(
            likedby=data['likedby'],
            blog = get_object_or_404(Blog, id=self.context.get('view').kwargs.get('blog_id'))
        )

        like.save()

        return like