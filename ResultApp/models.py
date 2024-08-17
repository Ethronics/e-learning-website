
from django.db import models
from ExamApp.models import ExamResult
from AssignmentApp.models import AssignmentResult
from QuizApp.models import QuizResult
from CurriculumApp.models import Curriculum,Lab
from User.models import User


class Result(models.Model):
    quiz_result = models.ForeignKey(QuizResult , on_delete=models.CASCADE , related_name='quiz_result')
    assignment_result = models.ForeignKey(AssignmentResult , on_delete=models.CASCADE , related_name='assignment_result')
    Midexam_result = models.ForeignKey(ExamResult , on_delete=models.CASCADE , related_name='midexam_result')
    Finalexam_result = models.ForeignKey(ExamResult , on_delete=models.CASCADE , related_name='finalexam_result')
    Lab_result = models.ForeignKey(Lab , on_delete=models.CASCADE , related_name='lab_result')
    grade = models.DecimalField(max_digits=2 , decimal_places=1 , null=True , blank=True)
    student = models.OneToOneField(User , on_delete=models.CASCADE , limit_choices_to={'role':'STUDENT'})
    curriculum = models.ForeignKey(Curriculum , on_delete=models.CASCADE , related_name='Curriculum_name')

    def __str__(self) -> str:
        return f'{self.grade}'