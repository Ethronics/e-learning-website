from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class Profession(models.Model):
    name = models.CharField(max_length=500, unique=True)

    def __str__(self):
        return self.name


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

    # Fields specific to Instructors
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    # courses = models.ManyToManyField(Course, related_name='instructors', blank=True)
    professions = models.ManyToManyField(Profession, related_name='users', blank=True)

    def save(self, *args, **kwargs):
        
        if self.is_superuser:
            self.role = User.Role.ADMIN
        elif self.role == User.Role.INSTRUCTOR:
            self.is_staff = True
            self.is_superuser = False
        elif not self.pk:
            self.role = self.base_role

        if self.role == User.Role.ADMIN:
            self.is_staff = True
            self.is_superuser = True
        # elif self.role == User.Role.INSTRUCTOR:
        #     self.is_staff = True
        #     self.is_superuser = False
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
