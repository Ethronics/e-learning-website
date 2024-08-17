
#QUIZ
from django.db import models
from CurriculumApp.models import Lesson
from User.models import User

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
    option1 = models.CharField(max_length=255)
    option2 = models.CharField(max_length=255)
    option3 = models.CharField(max_length=255)
    option4 = models.CharField(max_length=255)
    answer = models.CharField(max_length=1, choices=CHOICES, verbose_name='Answer')
    correct_answer = models.CharField(max_length=1 , choices=CHOICES)

    def __str__(self):
        return f"{self.question}- "


class Quiz(models.Model):
    instructor = models.ForeignKey(User , on_delete=models.PROTECT , related_name='quiz_creator' , limit_choices_to={'role':'INSTRUCTOR'})
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    Question = models.ForeignKey(Quiz_Question, on_delete=models.CASCADE)
    date = models.DateTimeField()

    def __str__(self):
        return f"Quiz for {self.lesson.title}"
    
class QuizResult(models.Model):
    Quiz = models.ForeignKey(Quiz , on_delete=models.PROTECT)
    no_of_question = models.PositiveIntegerField()
    right_answer = models.PositiveSmallIntegerField()
    TotalResult = models.PositiveSmallIntegerField()
