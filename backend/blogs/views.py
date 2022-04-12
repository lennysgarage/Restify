from rest_framework import generics
from rest_framework import permissions
from .serializers import AddBlogSerializer, BlogSerializer, LikeBlogSerializer, LikesBlogSerializer, RemoveBlogSerializer
from .models import Blog, LikeBlog
from restaurants.models import Restaurant, Follow
from django.shortcuts import get_object_or_404

class AddBlog(generics.CreateAPIView):
    queryset = Blog.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddBlogSerializer

class ViewBlogs(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        query = get_object_or_404(Restaurant, id=self.kwargs['restaurant_id'])
        object_list = Blog.objects.filter(restaurant__email = query.owner)
        return object_list

class RemoveBlog(generics.DestroyAPIView):
    queryset = Blog.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RemoveBlogSerializer
    
    def get_object(self):
        return get_object_or_404(self.queryset, id=self.kwargs['blog_id'], restaurant__email=self.request.user.email)

class ViewFeed(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BlogSerializer

    def get_queryset(self):
        followed_restaurants = set(follow.restaurant for follow in list(Follow.objects.filter(follower = self.request.user)))
        owners = set(restaurant.owner for restaurant in followed_restaurants)
        object_list = Blog.objects.filter(restaurant__email__in = owners)
        return object_list


class LikesBlog(generics.ListAPIView):
    queryset = LikeBlog.objects.all()
    serializer_class = LikesBlogSerializer


class LikeBlogView(generics.CreateAPIView):
    queryset = LikeBlog.objects.all()
    permissions_classes = [permissions.IsAuthenticated]
    serializer_class = LikeBlogSerializer

class UnLikeBlogView(generics.DestroyAPIView):
    queryset = LikeBlog.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LikeBlogSerializer

    def get_object(self):
        return get_object_or_404(self.queryset, blog=self.kwargs['blog_id'], likedby__email=self.request.user.email)

        
