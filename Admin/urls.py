from django.urls import path
from .views import *

urlpatterns=[

    path('AdminRegister/',AdminRegistrationView.as_view(),name='AdminRegister'),
    path('AdminLogin/',AdminLoginView.as_view(),name='AdminLogin'),
    path('verify_otp/',verify_otp.as_view(),name='verify_otp'),
    path('resend_otp/',resend_otp.as_view(),name='resend_otp'),
    path('AddCourses/',AddCourseView.as_view(),name='AddCourses'),
    path('retreiveCourses/',RetreiveCoursesDataView.as_view(),name='retreiveCourses'),
    path('VerifyEmail/',VerifyEmailView.as_view(),name='VerifyEmail'),
    path('verify_fp_otp/',verify_FP_otp.as_view(),name='verify_fp_otp'),
    path('ResetPassword/',ResetPassword.as_view(),name='ResetPassword'),
    path('deleteCourse/<int:id>/',DeleteCourses.as_view(),name='deleteCourse'),
    path('retreiveAdmins/',retreiveAdminsView.as_view(),name='retreiveAdmins'),
    path('updateCourses/<int:id>/',updateCoursesView.as_view(),name='updateCourses'),
    


]