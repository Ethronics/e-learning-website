import random
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        STUDENT = 'STUDENT', 'Student'
        INSTRUCTOR = 'Instructor', 'Instructor'
    
    base_role = Role.STUDENT
    profile_picture = models.FileField(upload_to='images/profile', blank=True, null=True)
    role = models.CharField(max_length=50, choices=Role.choices, default=base_role)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=False)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',  # Use unique related_name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',  # Use unique related_name
        blank=True
    )

    def save(self, *args, **kwargs):
        
        if self.is_superuser:
            self.role = User.Role.ADMIN
        elif not self.pk:
            self.role = self.base_role

        if self.role == User.Role.ADMIN:
            self.is_staff = True
            self.is_superuser = True
        elif self.role == User.Role.INSTRUCTOR:
            self.is_staff = True
            self.is_superuser = False
        super().save(*args, **kwargs)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    
class StudentManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.STUDENT)
 
class Student(User):
    class Meta:
        proxy = True

    objects = StudentManager()


class InstructorManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.INSTRUCTOR)
 
class Instructor(User):
    class Meta:
        proxy = True

    objects = InstructorManager()

class OTPVerification(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='otp_verification')
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def generate_otp(self):
        self.otp_code = str(random.randint(100000, 999999))
        self.save()

    def otp_expired(self):
        expiry_time = self.created_at + timezone.timedelta(minutes=10)
        return timezone.now() > expiry_time