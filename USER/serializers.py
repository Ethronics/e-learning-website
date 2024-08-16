from .models import User, Profession

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from rest_framework import serializers
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode

from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    confirm_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password', 'confirm_password')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user



class InstructorRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    confirm_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    professions = serializers.PrimaryKeyRelatedField(
        queryset=Profession.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'email', 'username', 'password',
            'confirm_password', 'profile_picture', 'bio', 'location', 'birth_date', 'professions','role'
        ]

    def validate(self, data):
        """
        Check that the password and confirm_password match.
        """
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError({"confirm_password": "Passwords must match."})

        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        professions = validated_data.pop('professions', [])
        validated_data['role'] = User.Role.INSTRUCTOR
        user = User.objects.create_user(**validated_data)
        user.professions.set(professions)
        return user



class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})



class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise ValidationError(_("User with this email does not exist."))
        return value


User = get_user_model()

class SetNewPasswordSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise ValidationError("Passwords do not match.")

        try:
            uid = urlsafe_base64_decode(data['uid']).decode()
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError):
            raise ValidationError("Invalid UID")

        if not default_token_generator.check_token(user, data['token']):
            raise ValidationError("Invalid or expired token")

        return data

    def save(self):
        uid = self.validated_data['uid']
        user = User.objects.get(pk=urlsafe_base64_decode(uid).decode())
        user.set_password(self.validated_data['new_password'])
        user.save()


    def save(self):
        uid = self.validated_data['uid']
        user = User.objects.get(pk=urlsafe_base64_decode(uid).decode())
        user.set_password(self.validated_data['new_password'])
        user.save()


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is not correct")
        return value

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("New password and confirm password do not match")
        return data

    def save(self):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'profile_picture', 'role']
        read_only_fields = ['first_name', 'last_name', 'email', 'profile_picture', 'role']

    def validate_username(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value


class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = ['name']


class InstructorProfileUpdateSerializer(serializers.ModelSerializer):
    
    email = serializers.ReadOnlyField()
    location = serializers.ReadOnlyField()
    birth_date = serializers.ReadOnlyField()
    professions = ProfessionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['username', 'bio', 'profile_picture', 'email', 'location', 'birth_date', 'professions']

    def update(self, instance, validated_data):
        
        instance.username = validated_data.get('username', instance.username)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.save()
        return instance

