from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'username','panel')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser')}
        ),
    )
    search_fields = ('email', 'username')
    ordering = ('email',)

# Register the CustomUser model with CustomUserAdmin
admin.site.register(CustomUser, CustomUserAdmin)


class LoginOTP(admin.ModelAdmin):
    model=LoginOTPModel
    list_display=['otp_code','created_at']
admin.site.register(LoginOTPModel,LoginOTP)

class Courses(admin.ModelAdmin):
    model=CoursesData
    list_display=['id','course_name','course_photo','tutor_name','tutor_email','tutor_contact']
admin.site.register(CoursesData,Courses)
