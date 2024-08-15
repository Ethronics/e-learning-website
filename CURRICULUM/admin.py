from django.contrib import admin
from .models import Course, Lesson, Lab, Curriculum, Enrollment, Result

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'instructor', 'total_lessons', 'starting_date', 'ending_date')
    search_fields = ('name', 'instructor__username')
    list_filter = ('starting_date', 'ending_date')

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('number', 'title', 'course')
    search_fields = ('title', 'course__name')
    list_filter = ('course',)

@admin.register(Lab)
class LabAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'date', 'location', 'max_students')
    search_fields = ('title', 'course__name')
    list_filter = ('course', 'date')

@admin.register(Curriculum)
class CurriculumAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'status', 'certificate_issued', 'price')
    search_fields = ('name',)
    list_filter = ('status', 'start_date', 'end_date')

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'curriculum', 'enrolled_date', 'completed')
    search_fields = ('student__username', 'curriculum__name')
    list_filter = ('enrolled_date', 'completed')

@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ('course', 'quiz', 'test', 'midexam', 'assignment', 'lab_assessment', 'final_exam', 'total')
    search_fields = ('course__name',)
    list_filter = ('course',)


