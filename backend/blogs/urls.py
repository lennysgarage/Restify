from django.urls import path
from . import views

app_name = 'blogs'

urlpatterns = [
    path('restaurant/addblog/', views.AddBlog.as_view()),
    path('restaurant/<int:restaurant_id>/blogs/', views.ViewBlogs.as_view()),
    path('restaurant/removeblog/<int:blog_id>/', views.RemoveBlog.as_view()),
    path('restaurant/blog/<int:blog_id>/like/', views.LikeBlogView.as_view()),
    path('restaurant/blog/<int:blog_id>/unlike/', views.UnLikeBlogView.as_view()),
    path('feed/', views.ViewFeed.as_view()),
    path('restaurant/blog/likes/', views.LikesBlog.as_view()),
]