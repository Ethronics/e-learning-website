from django.db import models
from CURRICULUM.models import Lesson, Course
from django.conf import settings

class Question(models.Model):
    EASY = 'E'
    INTERMEDIATE = 'I'
    HARD = 'H'
    DIFFICULTY_LEVELS = (
        (EASY, 'Easy'),
        (INTERMEDIATE, 'Intermediate'),
        (HARD, 'Hard'),
    )
    TEST_EXAM = 'T'
    MID_EXAM = 'M'
    FINAL_EXAM = 'F'
    
    EXAM_TYPES = (
        (TEST_EXAM, 'Test Exam'),
        (MID_EXAM, 'Mid Exam'),
        (FINAL_EXAM, 'Final Exam'),
    )

    CHOICE_A = 'A'
    CHOICE_B = 'B'
    CHOICE_C = 'C'
    CHOICE_D = 'D'

    CHOICES = (
        (CHOICE_A, 'A'),
        (CHOICE_B, 'B'),
        (CHOICE_C, 'C'),
        (CHOICE_D, 'D'),
    )

    question = models.TextField(verbose_name='Question')
    option1 = models.TextField(verbose_name='A')
    option2 = models.TextField(verbose_name='B')
    option3 = models.TextField(verbose_name='C')
    option4 = models.TextField(verbose_name='D')
    answer = models.CharField(max_length=1, choices=CHOICES, verbose_name='Answer')
    difficulty = models.CharField(max_length=1, choices=DIFFICULTY_LEVELS)
    question_for = models.CharField(max_length=10, choices=EXAM_TYPES)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.question[:50]} - {self.difficulty}"


class ExamDuration(models.Model):
    duration = models.PositiveIntegerField()


class Exam(models.Model):
    TEST_EXAM = 'T'
    MID_EXAM = 'M'
    FIAL_EXAM = 'F'
    
    EXAM_TYPES = (
        (TEST_EXAM, 'Test Exam'),
        (MID_EXAM, 'Mid Exam'),
        (FIAL_EXAM, 'Final Exam'),
    )
    duration = models.ForeignKey(ExamDuration, on_delete=models.PROTECT)
    exam_type = models.CharField(max_length=1 , choices=EXAM_TYPES , default=TEST_EXAM)
    course = models.ForeignKey(Course , on_delete=models.PROTECT , related_name="exam_belongs_to")
    Question = models.ForeignKey('Question', on_delete=models.CASCADE)
    lesson_topics = models.ManyToManyField(Lesson , related_name= 'lesson_topics')
    date = models.DateTimeField()
    prerequisite_lessons = models.ManyToManyField(Lesson , related_name='prerequest_for_exam')

    def __str__(self):
        return f"{self.exam_type} for {self.course} on {self.date}"


class ExamResult(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='exam_result', on_delete=models.SET_NULL, null=True)
    total = models.IntegerField()
    score = models.IntegerField()
    percent = models.FloatField()
    correct = models.IntegerField()
    wrong = models.IntegerField()
    date_taken = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.date_taken}"