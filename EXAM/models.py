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
    FIAL_EXAM = 'F'
    
    EXAM_TYPES = (
        (TEST_EXAM, 'Test Exam'),
        (MID_EXAM, 'Mid Exam'),
        (FIAL_EXAM, 'Final Exam'),
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
    question = models.CharField(max_length=300, unique=True, verbose_name='Question')
    option1 = models.CharField(max_length=300 , verbose_name= 'A')
    option2 = models.CharField(max_length=300 , verbose_name= 'B')
    option3 = models.CharField(max_length=300, verbose_name= 'C')
    option4 = models.CharField(max_length=300, verbose_name= 'D')
    answer = models.CharField(max_length=300, choices=CHOICES, verbose_name='Answer')
    difficulty = models.CharField(max_length=1, choices=DIFFICULTY_LEVELS )
    question_for = models.CharField(max_length=10, choices=EXAM_TYPES )
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
        
    def __str__(self):
        return f"{self.question} - {self.difficulty}"


class Exam(models.Model):
    TEST_EXAM = 'T'
    MID_EXAM = 'M'
    FIAL_EXAM = 'F'
    
    EXAM_TYPES = (
        (TEST_EXAM, 'Test Exam'),
        (MID_EXAM, 'Mid Exam'),
        (FIAL_EXAM, 'Final Exam'),
    )
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
    no_of_questions = models.PositiveIntegerField()
    right_answers = models.PositiveIntegerField()
    wrong_answers = models.PositiveIntegerField()
    total_result = models.PositiveIntegerField()
    result_per_cent = models.DecimalField(max_digits=2 , decimal_places=2)
