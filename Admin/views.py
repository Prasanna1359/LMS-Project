from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from django.contrib.auth import login
from .models import *
from .serializers import *
from .utils import *

class AdminRegistrationView(APIView):
    def post(self, request):
        serializer = AdminRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AdminLoginView(APIView):
    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            if user : 
                print("sending otp")
                otp_instance,_ = LoginOTPModel.objects.get_or_create(user=user)
                otp_instance.generate_otp()
                
                print(otp_instance.otp_code)
                print(user)
                print(user.email,"email")
                try:
                    send_otp_email(user, otp_instance.otp_code)
                except Exception as e:
                    print(f"Failed to send email: {str(e)}")
                    return Response({"error": "Failed to send OTP email"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                return Response({
                "message": "Login successful.OTP sent to your email.",
                "id":user.id,

            }, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class verify_otp(APIView):
   

    def post(self, request):
        print("Incoming Data:", request.data) 

        serializer = LoginOTPSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            otp_code = serializer.validated_data["otp"]
            
            # Checking if OTP exists
            otp_instance = LoginOTPModel.objects.filter(user=user).first()
            if not otp_instance:
                return Response({'message': 'OTP not found'}, status=400)

            # Checking if OTP is expired
            if otp_instance.is_expired():
                otp_instance.delete()
                return Response({'message': 'OTP expired. Please request a new one.'}, status=400)

            # Verify OTP
            if otp_instance.otp_code == otp_code:
                login(request, user)
                otp_instance.delete()
                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'Login Successful',
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'username':user.username
                })

        return Response({'message': 'Invalid OTP'}, status=400)



class resend_otp(APIView):
    def post(self, request):
        user_id = request.data.get("user_id")
        user = get_object_or_404(CustomUser, id=user_id)

        LoginOTPModel.objects.filter(user=user).delete()  # Delete existing OTP
        new_otp = LoginOTPModel.objects.create(user=user)  # Generate new OTP
        new_otp.generate_otp()

        print(new_otp.otp_code,"resend")

        send_otp_email(user, new_otp.otp_code)  # Send new OTP to email
        return Response({'message': 'New OTP has been sent.', 'user_id': user_id}, status=200)
    


class RetreiveCoursesDataView(APIView):
    # permission_classes=[IsAuthenticated]

    def get(self,request):
        data=CoursesData.objects.all()
        serializer=CourseSerializer(data,many=True)
        print(serializer.data)
        return Response(serializer.data,status=200)
    
class AddCourseView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    # permission_classes=[IsAuthenticated]

    def post(self,request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("savinggggg")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class VerifyEmailView(APIView):

    def post(self,request):
        email=request.data.get('email')
        print(email)
        user=CustomUser.objects.get(email=email)
        print(user)
        if user:
            otp_instance,_ = LoginOTPModel.objects.get_or_create(user=user)
            otp_instance.generate_otp()
                
            print(otp_instance.otp_code)
            print(user)
            print(user.email,"email")
            try:
                send_otp_email(user, otp_instance.otp_code)
            except Exception as e:
                print(f"Failed to send email: {str(e)}")
                return Response({"error": "Failed to send OTP email"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({
            "message": "Login successful.OTP sent to your email.",
            "id":user.id,

            }, status=status.HTTP_200_OK)
            
        return Response({"error":"email does not exists"},status=400)
    

class verify_FP_otp(APIView):
    def post(self, request):
        print("Incoming Data:", request.data) 

        serializer = LoginOTPSerializer(data=request.data)
        if serializer.is_valid():
            print("seriali...")
            user = serializer.validated_data["user"]
            otp_code = serializer.validated_data["otp"]
            
            # Checking if OTP exists
            otp_instance = LoginOTPModel.objects.filter(user=user).first()
            if not otp_instance:
                return Response({'message': 'OTP not found'}, status=400)

            # Checking if OTP is expired
            if otp_instance.is_expired():
                otp_instance.delete()
                return Response({'message': 'OTP expired. Please request a new one.'}, status=400)

            # Verify OTP
            if otp_instance.otp_code == otp_code:
                
                otp_instance.delete()
                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'OTP verified',
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'username':user.username
                })

        return Response({'message': 'Invalid OTP'}, status=400)

class ResetPassword(APIView):
    def put(self,request):
        id=request.data.get('id')
        password=request.data.get('password')

        if not id and password:
            return Response({"message":"enter valid password"},status=400)
        else:
            user=get_object_or_404(CustomUser,id=id)
            user.set_password(password)
            user.save()
            return Response({"message":"successfully reseted"},status=200)

       