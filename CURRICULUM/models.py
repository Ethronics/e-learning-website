from django.db import models
from USER.models import Student,Instructor


class Course(models.Model):
    instructor = models.ForeignKey(Instructor , on_delete=models.PROTECT , related_name='course_instructor')
    name = models.CharField(max_length=100)
    total_lessons = models.IntegerField()
    description = models.TextField()
    grade = models.FloatField(null=True, blank=True)
    starting_date = models.DateTimeField()
    ending_date = models.DateTimeField()
    
    def __str__(self) -> str:
        return f'{self.name} - {self.price}'


class Lesson(models.Model):
    number = models.IntegerField()
    title = models.CharField(max_length= 500)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    video = models.URLField(max_length=2000, blank=True, null=True)
    content = models.TextField()
    additional_materials = models.FileField(upload_to='lessons/materials/', blank=True, null=True)  # Optional

    def __str__(self):
        return f"Lesson {self.number}: {self.title}"


class Lab(models.Model):
    title = models.CharField(max_length=500)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateTimeField()
    instructions = models.TextField(blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)
    location = models.CharField(
        max_length=255, 
        blank=True, 
        null=True, 
        help_text="Specify the location where the lab will take place, e.g., Lab Room 101 or Online."
    )
    materials_needed = models.TextField(
        blank=True, 
        null=True, 
        help_text="List any materials or equipment needed for the lab, e.g., lab coat, safety goggles, shoes."
    )
    max_students = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} for {self.course.name}"


class Curriculum(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    courses = models.ManyToManyField(Course)
    grade = models.FloatField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=[('pass', 'Pass'), ('fail', 'Fail')], null=True, blank=True)
    certificate_issued = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    
    def __str__(self):
        return f'{self.name} started at {self.start_date}' 


class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE)
    enrolled_date = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)  

    def __str__(self):
        return f"{self.student.username} enrolled in {self.curriculum.name}"


class Result(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    quiz = models.FloatField(default=0)  
    test = models.FloatField(default=0)  
    midexam = models.FloatField(default=0)  
    assignment = models.FloatField(default=0)  
    lab_assessment = models.FloatField(default=0)  
    final_exam = models.FloatField(default=0)  
    total = models.FloatField(default=0)  
 
    def __str__(self) -> str:
        return self.total

