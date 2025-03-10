from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags


class AdminRegistrationSerializer(serializers.ModelSerializer):
    panel_choices=[
        ('admin',"admin"),
        ('student',"student")
    ]
    username = serializers.CharField(max_length=100)
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True, min_length=8)
    panel=serializers.ChoiceField(choices=panel_choices)
    profile=serializers.ImageField(required=False)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'confirm_password','panel','profile')

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        if validated_data['panel'] == "admin":
            user.is_active = True  
            user.is_staff = True  
            user.is_superuser=True
            user.save()
            return user
        if validated_data['panel'] == "student":
            user.is_active = True 
            user.is_staff = True 
            user.is_superuser=False
            
            user.save()
            return user 
        validated_data.pop('confirm_password')
        return CustomUser.objects.create(**validated_data)
        

        
class AdminLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    class Meta:
        model=CustomUser
        fields=['email','password']

    def validate(self, data):
        
        email = data.get('email')
        password = data.get('password')

        if email and password:
            
            try:
                user = CustomUser.objects.get(email=email)

                print(user,"user")
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError("Unable to log in with provided credentials.!!Please enter correct details")

            if user.check_password(password):
                if user.is_active and user.is_staff:
                    data['user'] = user
                    print(data,"data[user]")
                else:
                    raise serializers.ValidationError("User is not active or not an admin.")
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")

        return data
    

class LoginOTPSerializer(serializers.ModelSerializer):
    class Meta:
        model=LoginOTPModel
        fields=['user','otp']
    user=serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    otp=serializers.CharField(max_length=6)

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=CoursesData
        fields='__all__'

    def create(self, validated_data): 
        return CoursesData.objects.create(**validated_data)
    

class TutorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=TutorData
        fields='__all__'   

