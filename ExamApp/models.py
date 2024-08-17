from django.db import models
from CurriculumApp.models import Lesson, Course
from User.models import User

class Question(models.Model):
    EASY = 'E'
    INTERMEDIATE = 'I'
    HARD = 'H'
    DIFFICULTY_LEVELS = (
        (EASY, 'Easy'),
        (INTERMEDIATE, 'Intermediate'),
        (HARD, 'Hard'),
    )
    
    MID_EXAM = 'M'
    FINAL_EXAM = 'F'
    
    EXAM_TYPES = (
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


class ExamAttempt(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'STUDENT'})
    exam = models.ForeignKey('Exam', on_delete=models.CASCADE)
    attempt_number = models.PositiveIntegerField()  
    success = models.BooleanField(default=False)  
    score = models.IntegerField(null=True, blank=True)  
    date_attempted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - Attempt {self.attempt_number} for {self.exam}"

    class Meta:
        unique_together = ('student', 'exam', 'attempt_number')

class Exam(models.Model):
    MID_EXAM = 'M'
    FIAL_EXAM = 'F'
    
    EXAM_TYPES = (
        (MID_EXAM, 'Mid Exam'),
        (FIAL_EXAM, 'Final Exam'),
    )
    duration = models.ForeignKey(ExamDuration, on_delete=models.PROTECT)
    exam_type = models.CharField(max_length=1 , choices=EXAM_TYPES )
    course = models.ForeignKey(Course , on_delete=models.PROTECT , related_name="exam_belongs_to")
    Question = models.ForeignKey('Question', on_delete=models.CASCADE)
    lesson_topics = models.ManyToManyField(Lesson , related_name= 'lesson_topics')
    date = models.DateTimeField()
    prerequisite_lessons = models.ManyToManyField(Lesson , related_name='prerequest_for_exam')
    starting_time = models.DateTimeField(auto_now_add=True)
    ending_time = models.DateTimeField()

    def __str__(self):
        return f"{self.exam_type} for {self.course} on {self.date}"
    
    def can_attempt_exam(self, student):
        # Count how many attempts the student has already made for this exam
        attempts_count = ExamAttempt.objects.filter(student=student, exam=self).count()
        return attempts_count < 3  # Allow up to 3 attempts


class ExamResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name='StudentExamResult' , limit_choices_to={'role':'STUDENT'})
    total = models.IntegerField()
    score = models.IntegerField()
    percent = models.FloatField()
    date_taken = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.date_taken}"
    



