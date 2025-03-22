from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password

from django.contrib.auth import login
from Admin.models import *
from Admin.serializers import *

# Create your views here.
class ChangePasswordView(APIView):
    permission_classes=[IsAuthenticated]

    def put(self, request, id):
        email=request.data.get('email')
        password = request.data.get('password')
        new_password = request.data.get('newpassword')

        if not password or not new_password:
            return Response({"message": "Password and new password are required"}, status=400)

        user = get_object_or_404(CustomUser, id=id)

        
        if not check_password(password,user.password):
            return Response({"message": "Current password is incorrect"}, status=400)

        
        user.set_password(new_password)
        user.save()

        student = get_object_or_404(StudentData, email=email)

        
        student.password = new_password
        student.save()

        return Response({"message": "Password successfully updated"}, status=200)
        
        



