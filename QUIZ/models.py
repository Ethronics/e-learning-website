from django.db import models
from CURRICULUM.models import Lesson
from USER.models import Instructor

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
    question = models.CharField(max_length=255, unique=True, verbose_name='Question')
    option1 = models.CharField(max_length=255 , verbose_name= 'A')
    option2 = models.CharField(max_length=255 , verbose_name= 'B')
    option3 = models.CharField(max_length=255, verbose_name= 'C')
    option4 = models.CharField(max_length=255, verbose_name= 'D')
    answer = models.CharField(max_length=255, choices=CHOICES, verbose_name='Answer')
    correct_answer = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.question}- "


class Quiz(models.Model):
    instructor = models.ForeignKey(Instructor , on_delete=models.PROTECT , related_name='quiz_creator')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    Question = models.ForeignKey(Quiz_Question, on_delete=models.CASCADE)
    date = models.DateTimeField()

    def __str__(self):
        return f"Quiz for {self.lesson.title}"
    
class QuizResult(models.Model):
    Quiz = models.ForeignKey(Quiz , on_delete=models.PROTECT)
    no_of_question = models.PositiveIntegerField(max_length=255)
    right_answer = models.PositiveSmallIntegerField(max_length=255)
    wrong_answer = models.PositiveSmallIntegerField(max_length=255)
    TotalResult = models.PositiveSmallIntegerField(max_length=255)


