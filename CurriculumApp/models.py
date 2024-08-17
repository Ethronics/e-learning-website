#CURRICULUM
from django.db import models
from User.models import User
from django.core.mail import send_mail

class Course(models.Model):
    instructor = models.ForeignKey(User , on_delete=models.PROTECT , related_name='course_instructor', limit_choices_to={'role': 'INSTRUCTOR'})
    name = models.CharField(max_length=100)
    description = models.TextField()
    prerequisite = models.ManyToManyField('self', symmetrical=False,blank=True,related_name='next_courses')
    deadline = models.DateTimeField()
    
    def __str__(self) -> str:
        return f'{self.name}'


class Lesson(models.Model):
    number = models.IntegerField()
    title = models.CharField(max_length= 100)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    

class Lesson_video(models.Model):
    title = models.CharField(max_length=255)
    lesson = models.ForeignKey(Lesson , on_delete=models.CASCADE , related_name='lesson_videos')
    video = models.FileField(upload_to='video/')
    video_length = models.CharField(max_length=100)
    

    def __str__(self):
        return f"Lesson {self.title}: {self.video_length}"

class AdditionalNote(models.Model):
    additional_note = models.FileField(upload_to='notes/', blank=True, null=True)
    part = models.PositiveSmallIntegerField()
    course = models.ForeignKey('Course' , on_delete=models.CASCADE , related_name='course_additional_notes')


    def __str__(self):
        return f"course material for {self.course}: Part {self.part}"

class StudentLessonProgress(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lesson_progress', limit_choices_to={'role': 'STUDENT'})
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)
    progress_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.student.username} - {self.lesson}: {self.progress_percentage}% completed"



class Lab(models.Model):
    title = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.title} for {self.course.name}"


class Curriculum(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    courses = models.ManyToManyField(Course)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    prerequisite = models.ManyToManyField('self', symmetrical=False,blank=True,related_name='next_courses')

    
    def __str__(self):
        return f'{self.name} started at {self.start_date}' 

class Cart(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_cart', limit_choices_to={'role': 'STUDENT'})
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart for {self.student.username}"

    def calculate_total_price(self):
        total_price = sum(item.curriculum.price for item in self.items.all())
        return total_price
        

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.curriculum} in {self.cart.student.username}'s cart"

class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE , related_name='student_enrollment_history' , limit_choices_to={'role':'STUDENT'})
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE)
    enrolled_date = models.DateTimeField(auto_now_add=True) 
    completed = models.BooleanField(default=False) 
    progress = models.FloatField(default=0)  # Tracks the progress in percentage
 
    status = models.CharField(max_length=10, choices=[('pass', 'Pass'), ('fail', 'Fail')], null=True, blank=True)


    def __str__(self):
        return f"{self.student.username} enrolled in {self.curriculum.name}"



class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name="StudentFeedback" ,limit_choices_to={'role':'STUDENT'} ) 
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True , related_name="specific_course") 
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE, null=True, blank=True) 
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True , related_name="specific_Instructor" , limit_choices_to={'role':'Instructor'} )  
    content = models.TextField() 
    rating = models.IntegerField(choices=[(1, 'Poor'), (2, 'Fair'), (3, 'Good'), (4, 'Very Good'), (5, 'Excellent')], default=3)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback from {self.user.username} - {self.created_date}"

class AdminNotification(models.Model):
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='admin_notifications', limit_choices_to={'role': 'ADMIN'})
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='instructor_notifications', limit_choices_to={'role': 'INSTRUCTOR'})
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_notifications')
    content_type = models.CharField(max_length=50)  # e.g., 'video', 'quiz', 'exam', 'assignment'
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed = models.BooleanField(default=False)

    def send_notification(self):
        send_mail(
            subject=f"New {self.content_type.capitalize()} Uploaded for {self.course.name}",
            message=self.message,
            from_email='from@example.com',
            recipient_list=[self.admin.email]
        )

    def __str__(self):
        return f"Notification for {self.admin.username}: {self.instructor.username} uploaded {self.content_type}"

class UploadedContent(models.Model):
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_contents', limit_choices_to={'role': 'INSTRUCTOR'})
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='contents')
    upload_time = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)
    rejection_reason = models.TextField(blank=True, null=True)
    admin_notified = models.BooleanField(default=False)

    class Meta:
        abstract = True


class CourseVideo(UploadedContent):
    video_url = models.URLField(max_length=500)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_videos')
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_videos', limit_choices_to={'role': 'INSTRUCTOR'})


class CourseQuiz(UploadedContent):
    quiz_file = models.FileField(upload_to='uploads/quizzes/')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_quizzes')
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_quizzes', limit_choices_to={'role': 'INSTRUCTOR'})


class CourseExam(UploadedContent):
    exam_file = models.FileField(upload_to='uploads/exams/')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_exams')
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_exams', limit_choices_to={'role': 'INSTRUCTOR'})


class CourseAssignment(UploadedContent):
    assignment_file = models.FileField(upload_to='uploads/assignments/')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_assignments')
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_assignments', limit_choices_to={'role': 'INSTRUCTOR'})
