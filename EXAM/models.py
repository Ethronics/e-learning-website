from django.db import models
from CURRICULUM.models import Lesson,Course


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
    difficulty = models.CharField(max_length=1, choices=DIFFICULTY_LEVELS )
    question_for = models.CharField(max_length=10, choices=EXAM_TYPES )
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
        
    def __str__(self):
        return f"{self.question} - {self.difficulty}"

class ExamDuration(models.Model):
    duration = models.PositiveIntegerField(max_length=255)
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
    exam = models.ForeignKey('Exam' , on_delete=models.PROTECT)
    no_of_questions = models.PositiveIntegerField(max_length=255)
    right_answers = models.PositiveSmallIntegerField(max_length=255)
    wrong_answers = models.PositiveSmallIntegerField(max_length=255)
    total_result = models.PositiveSmallIntegerField(max_length=255)
    result_per_cent = models.DecimalField(max_digits=2 , decimal_places=2)
