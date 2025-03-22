from django.urls import path
from .views import *

urlpatterns=[
    path('ChangePassword/<int:id>/',ChangePasswordView.as_view(),name='ChangePassword')

]