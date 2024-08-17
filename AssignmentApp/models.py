from django.db import models
from CurriculumApp.models import Course
from User.models import User

#python manage.py makemigrations

class Assignment(models.Model):
   number = models.IntegerField()
   title = models.CharField(max_length=255)
   description = models.TextField()
   document = models.FileField(upload_to='assignments/', blank=True, null=True)
   course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments_for_course')
   instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assignments_creator', limit_choices_to={'role': 'INSTRUCTOR'})   
   addmision_date = models.DateTimeField(auto_now_add=True)
   Submission_date = models.DateTimeField(auto_now_add=True)


   def __str__(self):
       return f"{self.title} : {self.course}"

class StudentAssignmentSubmit(models.Model):
   assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='student_assignments')
   student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assignments_submitted' ,  limit_choices_to={'role': 'STUDENT'} , verbose_name="Students")
   document = models.FileField(upload_to='student_assignments/', blank=True, null=True)
   submitted_at = models.DateTimeField(auto_now_add=True)

   def __str__(self):
       return f"{self.student} : {self.assignment.title} submitted at {self.submitted_at}"

class AssignmentResult(models.Model):
    student = models.OneToOneField(User , on_delete=models.PROTECT , related_name='ResultOwner' , limit_choices_to={'role':'STUDENT'})
    instructor = models.OneToOneField(User , on_delete=models.PROTECT , related_name="ResultCreator" , limit_choices_to={'role':'INSTRUCTOR'})
    result = models.IntegerField()
    result_detail = models.TextField()


