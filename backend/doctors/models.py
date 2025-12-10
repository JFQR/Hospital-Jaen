from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.auth.base_user import BaseUserManager

class DoctorManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El usuario debe tener un email")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superusuario debe tener is_staff=True")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superusuario debe tener is_superuser=True")

        return self.create_user(email, password, **extra_fields)


class Doctor(AbstractUser):
    username = None
    first_name = None
    last_name = None
    last_login = None

    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    professional_license = models.CharField(max_length=15)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = DoctorManager()

    def __str__(self):
        return self.email

    class Meta:
        db_table = 'User'
        ordering = ['id']

