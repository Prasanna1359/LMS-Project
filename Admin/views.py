from django.shortcuts import get_object_or_404
from rest_framework import status,viewsets
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
                "panel":user.panel

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
                    'username':user.username,
                    "panel":user.panel,
                    "email":user.email,
                    "id":user.id
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
    permission_classes=[IsAuthenticated]

    def get(self,request):
        data=CoursesData.objects.all()
        serializer=CourseSerializer(data,many=True)
        print(serializer.data)
        return Response(serializer.data,status=200)



class CoursesSearchView(viewsets.ModelViewSet):

    permission_classes=[IsAuthenticated]

    queryset =CoursesData.objects.all()
    serializer_class=CourseSerializer

    def get_queryset(self):
        qs=CoursesData.objects.all()
        course_name=self.request.query_params.get('course_name')

        if course_name is not None:
            qs=qs.filter(course_name__icontains=course_name)
        return qs


class SearchProfileView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        email=self.request.query_params.get('email')
        data=CustomUser.objects.get(email=email)
        serializer=AdminRegistrationSerializer(data)
        print(serializer.data)
        return Response(serializer.data,status=200)


class SearchCoursesData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        email = request.query_params.get('email')

        # Retrieve student record
        student = StudentData.objects.filter(email=email).first()
        if not student:
            return Response({"error": "Student not found"}, status=404)

        # Retrieve related course names from StudentData
        course_names = student.course_name.values_list("course_name", flat=True)

        # Retrieve CoursesData records for the related course names
        course_data = CoursesData.objects.filter(course_name__in=course_names)
        
        serializer = CourseSerializer(course_data, many=True)
        print(serializer.data, "Courses data in student module")

        return Response(serializer.data, status=200)


class AddCourseView(APIView):
    
    permission_classes=[IsAuthenticated]

    def post(self, request):
        course_name = request.data.get('course_name')

        if not course_name:
            return Response({"message": "Course name is required"}, status=400)

        # Check if the course already exists
        if CoursesData.objects.filter(course_name=course_name).exists():
            return Response({"message": "Course with this name already exists"}, status=400)

        # Create the new course
        course = CoursesData.objects.create(course_name=course_name)
        return Response({"message": "Course created successfully", "course_id": course.id}, status=201)
    

class VerifyEmailView(APIView):
    # permission_classes=[IsAuthenticated]
    
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
                    'username':user.username,
                    'panel':user.panel
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


class DeleteCourses(APIView):
    permission_classes=[IsAuthenticated]


    def delete(self,request,id):
        print("deletingggg")
        try:
            course = CoursesData.objects.get(id=id)
            course.delete()
            return Response(status=204)
        except CoursesData.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            return Response({"detail": str(e)}, status=400)
        

class retreiveAdminsView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        data=CustomUser.objects.filter(panel="admin")
        serializer=AdminRegistrationSerializer(data,many=True)
        print(serializer.data)
        return Response(serializer.data,status=200)


class updateCoursesView(APIView):
    permission_classes=[IsAuthenticated]

    def put(self,request,id):
        try:
            course = CoursesData.objects.get(id=id)
            serializer = CourseSerializer(course, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        except CoursesData.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            return Response({"detail": str(e)},status=400)
        

 
class CourseListAPIView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request):
        courses = CoursesData.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




class VideoUploadView(APIView):
    permission_classes=[IsAuthenticated]

    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        serializer = VideosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class fetchVideosView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request,id):
        videos = Videos.objects.filter(course=id)
        serializer = VideosSerializer(videos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




class VideosSearchView(viewsets.ModelViewSet):

    permission_classes=[IsAuthenticated]

    queryset =Videos.objects.all()
    serializer_class=VideosSerializer

    def get_queryset(self):
        qs=Videos.objects.all()
        description=self.request.query_params.get('description')

        if description is not None:
            qs=qs.filter(description__icontains=description)
        return qs
    

class StudentSearchView(viewsets.ModelViewSet):

    permission_classes=[IsAuthenticated]

    queryset =StudentData.objects.all()
    serializer_class=StudentSerializer

    def get_queryset(self):
        qs=StudentData.objects.all()
        student_name=self.request.query_params.get('student_name')

        if student_name is not None:
            qs=qs.filter(student_name__icontains=student_name)
        return qs


class AdminSearchView(viewsets.ModelViewSet):

    permission_classes=[IsAuthenticated]

    queryset =CustomUser.objects.all()
    serializer_class=AdminRegistrationSerializer

    def get_queryset(self):
        qs=CustomUser.objects.filter(panel="admin")
        username=self.request.query_params.get('username')

        if username is not None:
            qs=qs.filter(username__icontains=username)
        return qs

 

class DeleteVideoView(APIView):
    permission_classes=[IsAuthenticated]

    def delete(self,request,id):
        try:
            video = Videos.objects.get(id=id)
            video.delete()
            return Response(status=204)
        except Videos.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            return Response({"detail": str(e)}, status=400)
        


class updateVideosView(APIView):
    permission_classes=[IsAuthenticated]

    def put(self,request,id):

        try:
            video = Videos.objects.get(id=id)
            serializer = VideosSerializer(video, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        except Videos.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            return Response({"detail": str(e)},status=400)




class StudentDataCreateAPIView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        print(request.data,"data from frontend")
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


 
class retreiveStudentsView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        data=StudentData.objects.all()
        serializer=StudentSerializer(data,many=True)
        print(serializer.data)
        return Response(serializer.data,status=200)



class updateStudentDataView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        try:
            student = StudentData.objects.get(id=id)
            data = request.data.copy()

            # Extract course names from request
            course_names = data.pop('course_name', [])
            if isinstance(course_names, str):  
                course_names = [course_names]  # Ensure it's always a list

            serializer = StudentSerializer(student, data=data, partial=True)
            if serializer.is_valid():
                updated_student = serializer.save()

                # Convert course names to actual course objects and update the relationship
                courses = CoursesData.objects.filter(course_name__in=course_names)
                updated_student.course_name.set(courses)

                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)

        except StudentData.DoesNotExist:
            return Response({"detail": "Student not found"}, status=404)
        except Exception as e:
            return Response({"detail": str(e)}, status=400)

class deleteStudentView(APIView):
    permission_classes=[IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        print("deletingggg")
        try:
            id = kwargs.get('id')  # Fetching the id from kwargs
            course = StudentData.objects.get(id=id)
            course.delete()
            return Response(status=204)
        except StudentData.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            return Response({"detail": str(e)}, status=400)



