from django.urls import path, include

from .views import ( RegisterView, LoginView, 
        ForgetPassword, SetNewPasswordView, ChangePasswordView,
        UserProfileView, InstructorRegistrationView, InstructorProfileUpdateView)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('password-reset/', ForgetPassword.as_view(), name='password_reset'),
    path('set-new-password/<uidb64>/<token>/', SetNewPasswordView.as_view(), name='set_new_password'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('register-instructor/', InstructorRegistrationView.as_view(), name='register-instructor'),
    path('ins/profile/', InstructorProfileUpdateView.as_view(), name='update-profile'),
]

