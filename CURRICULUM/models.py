from django.db import models
from USER.models import Student,Instructor

class Course(models.Model):
    instructor = models.ForeignKey(Instructor , on_delete=models.PROTECT , related_name='course_instructor')
    name = models.CharField(max_length=100)
    total_lessons = models.IntegerField()
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    grade = models.FloatField(null=True, blank=True)
    starting_date = models.DateTimeField()
    ending_date = models.DateTimeField()
    
    def __str__(self) -> str:
        return f'{self.name} - {self.price}'

class Lesson(models.Model):
    number = models.IntegerField()
    title = models.CharField(max_length= 100)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    video = models.URLField(max_length=200, blank=True, null=True)
    additional_note = models.FileField(upload_to='notes/', blank=True, null=True)

    def __str__(self):
        return f"Lesson {self.number}: {self.title}"

class Lab(models.Model):
    title = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateTimeField()

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

    
    def __str__(self):
        return f'{self.name} started at {self.start_date}' 

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE)
    enrolled_date = models.DateTimeField(auto_now_add=True)  # Automatically sets enrollment date
    completed = models.BooleanField(default=False)  

    def __str__(self):
        return f"{self.student.username} enrolled in {self.curriculum.name}"


class Result(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    quiz = models.FloatField(default=0)  
    test1 = models.FloatField(default=0)  
    midexam = models.FloatField(default=0)  
    assignment = models.FloatField(default=0)  
    lab_assessment = models.FloatField(default=0)  
    final_exam = models.FloatField(default=0)  
    total = models.FloatField(default=0)  
 
    def __str__(self) -> str:
        return self.total

