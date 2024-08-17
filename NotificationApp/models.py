from django.db import models
from User.models import User
from django.utils import timezone
from django.core.mail import send_mail


# Notification model for tracking student progress and notifying the admin
class StudentLessonProgress(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lesson_progress', limit_choices_to={'role': 'STUDENT'})
    lesson = models.ForeignKey('Lesson', on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)
    progress_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    notified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student.username} - {self.lesson}: {self.progress_percentage}% completed"

class AdminNotification(models.Model):
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='admin_notifications', limit_choices_to={'role': 'ADMIN'})
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_notifications', limit_choices_to={'role': 'STUDENT'})
    lesson = models.ForeignKey('Lesson', on_delete=models.CASCADE)
    progress_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.admin.username}: {self.student.username} completed {self.lesson.title} ({self.progress_percentage}%)"

    def send_notification(self):
        subject = f"Student {self.student.username} Progress Update"
        message = f"{self.student.username} has completed {self.progress_percentage}% of the lesson {self.lesson.title}. Please send their progress report."
        send_mail(subject, message, 'from@example.com', [self.admin.email], fail_silently=False)

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Notification(models.Model):
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications', limit_choices_to={'role': 'INSTRUCTOR'})
    message = models.TextField()  # Notification message content
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)  # To track if the notification has been read
    link = models.URLField(blank=True, null=True)  # Optional: URL link to content upload form

    def __str__(self):
        return f"Notification for {self.recipient.username} - {self.created_at}"
