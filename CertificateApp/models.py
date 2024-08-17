
from django.db import models
from CurriculumApp.models import  Curriculum
from User.models import User

class Certificarte(models.Model):
    name = models.OneToOneField(User , on_delete=models.CASCADE , limit_choices_to={'role':'STUDENT'})
    description = models.CharField(max_length=255)
    logo = models.FileField(upload_to='logo/')
    student_photo = models.FileField(upload_to='student_photo/')
    certified_to = models.ForeignKey(Curriculum , on_delete=models.CASCADE)


