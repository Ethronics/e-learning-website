from django.contrib import admin
from .models import Assignment, StudentAssignmentSubmit

class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('number', 'title', 'course', 'instructor', 'admission_date', 'submission_date', 'grade')
    search_fields = ('title', 'course__name', 'instructor__username')
    list_filter = ('course', 'instructor', 'admission_date', 'submission_date', 'grade')
    ordering = ('course', 'number')
    date_hierarchy = 'admission_date'

class StudentAssignmentSubmitAdmin(admin.ModelAdmin):
    list_display = ('assignment', 'student', 'submitted_at')
    search_fields = ('assignment__title', 'student__username')
    list_filter = ('assignment', 'student', 'submitted_at')
    ordering = ('assignment', 'student')
    date_hierarchy = 'submitted_at'

admin.site.register(Assignment, AssignmentAdmin)
admin.site.register(StudentAssignmentSubmit, StudentAssignmentSubmitAdmin)
