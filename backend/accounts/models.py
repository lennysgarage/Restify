from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.db.models import SET_NULL
from django.db import models
from django.utils.timezone import now


# source: https://tech.serhatteker.com/post/2020-01/email-as-username-django/
class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=256, null=True)
    country_code = models.CharField(max_length=256, null=True)
    address = models.CharField(max_length=256, null=True)
    profile_photo = models.ImageField(null=True, blank=True, upload_to="images/userphotos/")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()


class Notification(models.Model):
    user = models.ForeignKey(to=User, on_delete=SET_NULL, null=True, related_name='notifs_user')
    date = models.DateTimeField(default=now, editable=False)
    title = models.CharField(max_length=255)
    content = models.CharField(max_length=255)
