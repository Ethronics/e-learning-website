from django.db import models
from CURRICULUM.models import Course
from USER.models import Student,Instructor


class Assignment(models.Model):
   number = models.IntegerField()
   title = models.CharField(max_length=255)
   description = models.TextField()
   document = models.FileField(upload_to='assignments/', blank=True, null=True)
   course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments')
   instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name='assignments_creator')
   addmision_date = models.DateTimeField(auto_now_add=True)
   Submission_date = models.DateTimeField(auto_now_add=True)
   grade = models.IntegerField(default=0, blank=True, null=True)


   def __str__(self):
       return f"{self.title} : {self.course}"

   

class StudentAssignmentSubmit(models.Model):
   assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='student_assignments')
   student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='assignments_submitted')
   document = models.FileField(upload_to='student_assignments/', blank=True, null=True)
   submitted_at = models.DateTimeField(auto_now_add=True)

   def __str__(self):
       return f"{self.student} : {self.assignment.title} submitted at {self.submitted_at}"

