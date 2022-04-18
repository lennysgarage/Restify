from django.db import IntegrityError
from django.http import JsonResponse
from rest_framework import generics
from rest_framework import permissions
from .serializers import AddBlogSerializer, BlogSerializer, LikeBlogSerializer, LikesBlogSerializer, RemoveBlogSerializer
from .models import Blog, LikeBlog
from restaurants.models import Follow, Restaurant
from django.shortcuts import get_object_or_404

class AddBlog(generics.CreateAPIView):
    queryset = Blog.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddBlogSerializer

class ViewBlogs(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        query = get_object_or_404(Restaurant, id=self.kwargs['restaurant_id'])
        object_list = Blog.objects.filter(restaurant__id = query.id)
        return object_list

class GetBlog(generics.RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    
    def get_object(self):
        return get_object_or_404(self.queryset, id=self.kwargs['blog_id'])

class RemoveBlog(generics.DestroyAPIView):
    queryset = Blog.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RemoveBlogSerializer
    
    def get_object(self):
        return get_object_or_404(self.queryset, id=self.kwargs['blog_id'])

class ViewFeed(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BlogSerializer

    def get_queryset(self):
        followed_restaurants = set(follow.restaurant for follow in list(Follow.objects.filter(follower = self.request.user)))
        object_list = Blog.objects.filter(restaurant__in = followed_restaurants)
        return object_list


class LikesBlog(generics.ListAPIView):
    queryset = LikeBlog.objects.all()
    serializer_class = LikesBlogSerializer


class LikeBlogView(generics.CreateAPIView):
    queryset = LikeBlog.objects.all()
    permissions_classes = [permissions.IsAuthenticated]
    serializer_class = LikeBlogSerializer

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            return JsonResponse({
                'status_code': 403,
                'error': 'User can only like the same blog once.'
            })

class UnLikeBlogView(generics.DestroyAPIView):
    queryset = LikeBlog.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LikeBlogSerializer

    def get_object(self):
        return get_object_or_404(self.queryset, blog=self.kwargs['blog_id'], likedby__email=self.request.user.email)

        
