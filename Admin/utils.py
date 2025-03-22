from django.core.mail import send_mail
from django.conf import settings

def send_otp_email(user,otp):
    print("entered into send otp")
    print(user.email,otp)
    subject="Your OTP Code for Login"
    message=f"Hello {user},\n \n Your OTP Code is : {otp} \n\n Use this to complete your login "
    send_mail(subject,message,settings.EMAIL_HOST_USER,[user.email])
    
    
