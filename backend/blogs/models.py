from restaurants.models import User
from django.db import models
from django.db.models import SET_NULL
from django.utils.timezone import now

class Blog(models.Model):
    date = models.DateTimeField(default=now, editable=False)
    header = models.CharField(max_length=256)
    subtext = models.CharField(max_length=256)
    body = models.TextField()
    restaurant = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='blog_restaurant')


class LikeBlog(models.Model):
    likedby = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='likedby_blog_owner')
    blog = models.ForeignKey(to=Blog, on_delete=SET_NULL, null=True, related_name='liked_blog')

    class Meta:
        constraints  = [
            models.UniqueConstraint(fields=['blog', 'likedby'], name="unique_blog_likes")
        ]