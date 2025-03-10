from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser,Group,Permission
from django.db import models
from django.conf import settings
import random

class CustomUser(AbstractUser):
    groups = models.ManyToManyField(Group, related_name="groups_tokens")
    user_permissions = models.ManyToManyField(Permission, related_name="permissions_tokens")
    panel_choices=[
        ('admin',"admin"),
        ('student',"student")
    ]
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=False,null=True)  
    password=models.CharField(max_length=50)
    panel=models.CharField(max_length=20,choices=panel_choices)
    profile=models.ImageField(upload_to='uploads/',null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','panel'] 



class LoginOTPModel(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    otp_code=models.CharField(max_length=6)
    created_at=models.DateTimeField(auto_now_add=True)
    
    def generate_otp(self):
        self.otp_code=str(random.randint(100000,999999))
        self.created_at=timezone.now()
        self.save()

    def is_expired(self):
        return (timezone.now() - self.created_at).total_seconds() > 60
    
    def _str_(self):
        return self.user.email
    


class CoursesData(models.Model):
    course_name=models.CharField(max_length=50,unique=True)
    course_photo=models.ImageField(upload_to='uploads/')
    tutor_name=models.CharField(max_length=50)
    tutor_email=models.EmailField()
    tutor_contact=models.CharField(max_length=10)

    def _str_(self):
        return self.course_name


class TutorData(models.Model):

    tutor_name=models.CharField(max_length=100)
    tutor_email=models.EmailField()
    tutor_contact=models.CharField(max_length=10)

    def _str_(self):
        return self.tutor_email
    


# class StudentData(models.Model):

   
#     user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
#     courses=models.ManyToManyField()
#     joined_date=models.DateField()
#     end_date=models.DateField()
   