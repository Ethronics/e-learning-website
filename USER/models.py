# FOR USER 

from django.db import models

class Student(models.Model):
    profile_picture = models.FileField(upload_to='student_assignments/', blank=True, null=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=10)
    password = models.CharField(max_length=10)

    def __str__(self) -> str:
        return f'{self.first_name} - {self.last_name}'

class Instructor(models.Model):
    profile_picture = models.FileField(upload_to='student_assignments/', blank=True, null=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=10)
    password = models.CharField(max_length=10)

    def __str__(self) -> str:
        return f'{self.first_name} - {self.last_name}'
