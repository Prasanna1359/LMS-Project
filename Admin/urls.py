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
    path('courses/', CourseListAPIView.as_view(), name='course-list'),
    path('student-data/', StudentDataCreateAPIView.as_view(), name='student-data'),
   path('retreiveStudents/', retreiveStudentsView.as_view(), name='retreiveStudents'),

    path('fetchVideos/<int:id>/',fetchVideosView.as_view(),name='fetchVideos'),
    path('upload_video/',VideoUploadView.as_view(),name='upload_video'),
    path('DeleteVideo/<int:id>/',DeleteVideoView.as_view(),name='DeleteVideo'),
    path('updateVideos/<int:id>/',updateVideosView.as_view(),name='updateVideos'),
    path('updateStudent/<int:id>/',updateStudentDataView.as_view(),name='updateStudent'),
    path('deleteStudent/<int:id>/',deleteStudentView.as_view(),name='deleteStudent'),

    path('searchCourses',CoursesSearchView.as_view({'get': 'list'}),name='searchCourses'),
    path('searchDescription',VideosSearchView.as_view({'get': 'list'}),name='searchDescription'),
    path('SearchStudents',StudentSearchView.as_view({'get': 'list'}),name='SearchStudents'),
    path('SearchAdmins',AdminSearchView.as_view({'get': 'list'}),name='SearchAdmins'),
    
    path('searchprofile',SearchProfileView.as_view(),name='searchprofile'),
    path('searchCoursesData',SearchCoursesData.as_view(),name='searchCoursesData'),

    path('profile/<str:email>/',StudentProfileView.as_view(),name='profile'),
    path('retreiveEnrolledStudents/',retreiveEnrolledStudentsView.as_view(),name='retreiveEnrolledStudents'),
    


]