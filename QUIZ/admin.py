from django.contrib import admin
from .models import Quiz, QuizResult

class QuizAdmin(admin.ModelAdmin):
    list_display = ('lesson', 'question', 'answer', 'instructor', 'correct_answer')
    search_fields = ('question', 'lesson__title', 'instructor__username')
    list_filter = ('lesson', 'instructor')
    ordering = ('lesson', 'id')
    list_display_links = ('question',)

class QuizResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'total', 'score', 'percent', 'correct', 'wrong', 'date_taken')
    search_fields = ('user__username', 'lesson__title')
    list_filter = ('lesson', 'date_taken')
    ordering = ('date_taken', 'user')
    list_display_links = ('user',)

admin.site.register(Quiz, QuizAdmin)
admin.site.register(QuizResult, QuizResultAdmin)
