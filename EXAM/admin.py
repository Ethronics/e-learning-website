from django.contrib import admin
from .models import Question, ExamDuration, Exam, ExamResult

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'course', 'difficulty', 'question_for', 'answer')
    search_fields = ('question', 'course__name')
    list_filter = ('course', 'difficulty', 'question_for')
    ordering = ('course', 'difficulty')
    list_display_links = ('question',)

class ExamDurationAdmin(admin.ModelAdmin):
    list_display = ('duration',)
    search_fields = ('duration',)

class ExamAdmin(admin.ModelAdmin):
    list_display = ('exam_type', 'course', 'date', 'duration')
    search_fields = ('course__name', 'exam_type')
    list_filter = ('course', 'exam_type', 'date')
    ordering = ('course', 'date')
    filter_horizontal = ('lesson_topics', 'prerequisite_lessons')

class ExamResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'total', 'score', 'percent', 'correct', 'wrong', 'date_taken')
    search_fields = ('user__username', 'lesson__title')
    list_filter = ('lesson', 'date_taken')
    ordering = ('date_taken', 'user')
    list_display_links = ('user',)

admin.site.register(Question, QuestionAdmin)
admin.site.register(ExamDuration, ExamDurationAdmin)
admin.site.register(Exam, ExamAdmin)
admin.site.register(ExamResult, ExamResultAdmin)
