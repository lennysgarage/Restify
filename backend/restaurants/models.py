from accounts.models import User
from blogs.models import Blog
from django.db import models
from django.db.models import SET_NULL
from django.utils.timezone import now

class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    logo = models.ImageField(null=True, blank=True, upload_to="images/logos/")
    postal_code = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=20)
    country_code = models.CharField(max_length=3)
    owner = models.OneToOneField(to=User, on_delete=SET_NULL, null=True, related_name='owner')
    description = models.TextField()

    def __str__(self) -> str:
        return self.name

    def is_owner(self, owner):
        return owner == self.owner 

class RestaurantImage(models.Model):
    img = models.ImageField(null=True, blank=True, upload_to="images/restaurants/")
    restaurant = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True, related_name='imgs_restaurant')

class MenuItem(models.Model):
    restaurant = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='menus_restaurant')
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    photo = models.ImageField(null=True, blank=True, upload_to="images/menu_items/")

    def __str__(self) -> str:
        return self.name
    
class Comment(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True, related_name='cmnts_restaurant')
    body = models.TextField()
    owner = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='cmnt_owner')
    date = models.DateTimeField(default=now, editable=False)

class Follow(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True, related_name='followed_restaurant')
    follower = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='follower_owner')

    class Meta:
        constraints  = [
            models.UniqueConstraint(fields=['follower', 'restaurant'], name="unique_follow")
        ]


class Like(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True, related_name='liked_restaurant')
    likedby = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='likedby_restaurant_owner')

    class Meta:
        constraints  = [
            models.UniqueConstraint(fields=['restaurant', 'likedby'], name="unique_restaurant_likes")
        ]
