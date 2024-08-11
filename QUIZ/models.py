from django.db import models
from CURRICULUM.models import Lesson

class Quiz_Question(models.Model):
    CHOICE_A = 'A'
    CHOICE_B = 'B'
    CHOICE_C = 'C'
    CHOICE_D = 'D' 

    CHOICES = (
        (CHOICE_A , 'A'),
        (CHOICE_B , 'B'),
        (CHOICE_C , 'C'),
        (CHOICE_D , 'D')
        ) 
    question = models.CharField(max_length=300, unique=True, verbose_name='Question')
    option1 = models.CharField(max_length=300 , verbose_name= 'A')
    option2 = models.CharField(max_length=300 , verbose_name= 'B')
    option3 = models.CharField(max_length=300, verbose_name= 'C')
    option4 = models.CharField(max_length=300, verbose_name= 'D')
    answer = models.CharField(max_length=300, choices=CHOICES, verbose_name='Answer')
    correct_answer = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.question}- "


class Quiz(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    Question = models.ForeignKey(Quiz_Question, on_delete=models.CASCADE)
    date = models.DateTimeField()

    def __str__(self):
        return f"Quiz for {self.lesson.title}"

