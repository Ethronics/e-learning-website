from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        STUDENT = 'STUDENT', 'Student'
        Instructor = 'Instructor', 'Instructor'
    
    base_role = Role.STUDENT
    profile_picture = models.FileField(upload_to='images/profile', blank=True, null=True)
    role = models.CharField(max_length=50, choices=Role.choices, default=base_role)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=False)

    def save(self, *args, **kwargs):
        
        if self.is_superuser:
            self.role = User.Role.ADMIN
        elif not self.pk:
            self.role = self.base_role

        if self.role == User.Role.ADMIN:
            self.is_staff = True
            self.is_superuser = True
        elif self.role == User.Role.Instructor:
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
        return results.filter(role=User.Role.Instructor)
 
class Instructor(User):
    class Meta:
        proxy = True

    objects = InstructorManager()
