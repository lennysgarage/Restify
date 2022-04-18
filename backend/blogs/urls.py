from django.urls import path
from . import views

app_name = 'blogs'

urlpatterns = [
    path('<int:restaurant_id>/', views.ViewBlogs.as_view()),
    path('<int:restaurant_id>/addblog/', views.AddBlog.as_view()),
    path('removeblog/<int:blog_id>/', views.RemoveBlog.as_view()),
    path('blog/<int:blog_id>/', views.GetBlog.as_view()),
    path('blog/likes/<int:blog_id>/', views.GetLikes.as_view()),
    path('<int:blog_id>/like/', views.LikeBlogView.as_view()),
    path('<int:blog_id>/unlike/', views.UnLikeBlogView.as_view()),
    path('feed/', views.ViewFeed.as_view()),
    path('likes/', views.LikesBlog.as_view()),
]