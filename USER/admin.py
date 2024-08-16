from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Student, Instructor

class UserAdmin(BaseUserAdmin):
    model = User
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email'),
        }),
    )
    list_display = ('username', 'email', 'role', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email')
    ordering = ('username',)

class displayUser(BaseUserAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email', 'role', 'date_joined')
    search_fields = ('username', 'email')
    ordering = ('username',)


admin.site.register(User, UserAdmin)
admin.site.register(Student, displayUser)
admin.site.register(Instructor, displayUser)