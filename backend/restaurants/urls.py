from django.urls import path
from . import views

app_name = 'restaurants'

urlpatterns = [
    path('create/', views.CreateRestaurant.as_view()),
    path('', views.GetRestaurants.as_view()),
    path('myrestaurant/', views.GetRestaurant.as_view()),
    path('edit/', views.EditRestaurant.as_view()),
    path('search/', views.SearchRestaurants.as_view()),
    path('<int:restaurant_id>/', views.ViewRestaurant.as_view()),
    path('addmenu/', views.AddMenuItem.as_view()),
    path('<int:restaurant_id>/menu/', views.ViewMenuItems.as_view()),
    path('editmenu/<int:menuitem_id>/', views.EditMenuItem.as_view()),
    path('<int:restaurant_id>/addcomment/', views.AddComment.as_view()),
    path('<int:restaurant_id>/comments/', views.ViewComments.as_view()),
    path('<int:restaurant_id>/follow/', views.FollowView.as_view()),
    path('<int:restaurant_id>/unfollow/', views.Unfollow.as_view()),
    path('<int:restaurant_id>/followers/', views.ViewFollowers.as_view()),
    path('<int:restaurant_id>/like/', views.LikeRestaurantView.as_view()),
    path('<int:restaurant_id>/unlike/', views.UnLikeRestaurantView.as_view()),
    path('<int:restaurant_id>/addphoto/', views.AddPhoto.as_view()),
    path('<int:restaurant_id>/removephoto/<int:restaurantimage_id>/', views.RemovePhoto.as_view()),
    path('<int:restaurant_id>/photos/', views.GetPhotos.as_view()),
    path('likes/', views.Likes.as_view()),
]