from django.db import models
from CURRICULUM.models import Lesson
from USER.models import Instructor
from django.conf import settings

class Quiz(models.Model):
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
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    question = models.CharField(max_length=255, unique=True, verbose_name='Question')
    option1 = models.CharField(max_length=255 , verbose_name= 'A')
    option2 = models.CharField(max_length=255 , verbose_name= 'B')
    option3 = models.CharField(max_length=255, verbose_name= 'C')
    option4 = models.CharField(max_length=255, verbose_name= 'D')
    answer = models.CharField(max_length=255, choices=CHOICES, verbose_name='Answer')
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.PROTECT , related_name='quiz_creator')
    correct_answer = models.CharField(max_length=255)

    def __str__(self):
        return f"quiz-{self.id} - {self.instructor}- {self.lesson}"


class QuizResult(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='quiz_result', on_delete=models.SET_NULL, null=True)
    total = models.IntegerField()
    score = models.IntegerField()
    percent = models.FloatField()
    correct = models.IntegerField()
    wrong = models.IntegerField()
    date_taken = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.date_taken}"




