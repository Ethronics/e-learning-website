from django.urls import reverse_lazy
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import LoginView as BaseLoginView, LogoutView as BaseLogoutView
from django.views.generic.edit import CreateView
from django.shortcuts import redirect
from django.contrib.auth import authenticate


from .serializers import (
    RegisterSerializer, LoginSerializer,
    PasswordResetSerializer, ChangePasswordSerializer, SetNewPasswordSerializer,
    UserProfileSerializer, InstructorRegistrationSerializer, InstructorProfileUpdateSerializer
)
from .models import User
from ethronics.mail import send_custom_email


from rest_framework import generics
from rest_framework import viewsets, permissions
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser


from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string


from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model



class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)

        subject = "Welcome to Ethronics"
        template_name = "emails/welcome_email.html"
        context = {
            "username": user.username,
            "login_url": f"{settings.FRONTEND_URL}/user/login",
        }
        recipient_list = [user.email]

        # Send the email
        send_custom_email(subject, template_name, context, recipient_list)

        return Response({
            "user": serializer.data,
            "token": token.key
        }, status=status.HTTP_201_CREATED)



class InstructorRegistrationView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, *args, **kwargs):
        serializer = InstructorRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            subject = "Welcome to Ethronics"
            template_name = "emails/welcome_email.html"
            context = {
                "username": user.username,
                "login_url": f"{settings.FRONTEND_URL}/user/login",
            }
            recipient_list = [user.email]

            # Send the email
            send_custom_email(subject, template_name, context, recipient_list)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(email=serializer.data['email'], password=serializer.data['password'])
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key
            }, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
class InstructorProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user

        if user.role != User.Role.INSTRUCTOR:
            return Response({"detail": "Only instructors can update their profile."}, status=status.HTTP_403_FORBIDDEN)

        serializer = InstructorProfileUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgetPassword(APIView):

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = f"{settings.FRONTEND_URL}/user/set-new-password/{uid}/{token}/"

            context = {
                'reset_url': reset_url,
                'user': user,
            }
            subject = 'Password Reset Requested'
            template_name = 'emails/password_reset_email.html'
            
            send_custom_email(subject, template_name, context, [user.email])

            return Response({"detail": "Password reset email has been sent."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



User = get_user_model()

class SetNewPasswordView(APIView):

    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                return Response({"uid": uidb64, "token": token}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
        except (User.DoesNotExist, ValueError, TypeError):
            return Response({"error": "Invalid UID."}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, uidb64, token):
        data = {
            'uid': uidb64,
            'token': token,
            'new_password': request.data.get('new_password'),
            'confirm_password': request.data.get('confirm_password')
        }
        serializer = SetNewPasswordSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Password has been reset."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Password has been changed successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)