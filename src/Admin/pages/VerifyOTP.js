
import { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/LoginCSS.css"
import { useAuth } from "../../Student/AuthContext";


const VerifyOTP = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");
    const [loading, setLoading] = useState(false);
    
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    
    const loggedUserId = location.state?.id;
    const action=location.state?.action


    const { login } = useAuth();
  

  const handleLogin = (data) => {
    const fakeToken = data.access; // Normally, this comes from an API
    login(fakeToken);
    if(data.panel === "admin"){
        navigate('/admin_home', { state: { user: data } });
    }
    else{
        navigate('/student-home', { state: { user: data } });
    }
  };

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (!canResend) setTimeLeft(60);
    }, [canResend]);

    const showToastMessage = (message, variant = "success") => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;  
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handlePaste = (event) => {
        const pasteData = event.clipboardData.getData("text").trim();
        if (/^\d{6}$/.test(pasteData)) {
            setOtp(pasteData.split(""));
            inputsRef.current[5]?.focus();
        }
    };

    const handleSubmit = async (event) => {
    
        event.preventDefault();
        setLoading(true)
        const enteredOtp = otp.join("");
        if(action === "login"){
            try {
                const response = await fetch("http://127.0.0.1:8000/AdminUrls/verify_otp/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user: loggedUserId, otp: enteredOtp }),
                });
    
                const data = await response.json();
                if (!response.ok){
                     throw new Error(data.message || "Invalid OTP");
                }
                console.log("data",data)
                localStorage.setItem("access_token", data.access);
                handleLogin(data)
                showToastMessage("OTP Verified Successfully!", "success");
                // if(data.panel === "admin"){
                //     navigate('/admin_home', { state: { user: data } });

                // }

                // else{
                //     navigate('/student-home', { state: { user: data } });
                // }
                // navigate('/admin_home', { state: { user: data } });
    
            } catch (error) {
                showToastMessage(error.message, "danger");
            }finally{
                setLoading(false)
            }

        }
        if(action === "forgot-password"){


            try {
                const response = await fetch("http://127.0.0.1:8000/AdminUrls/verify_fp_otp/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user: loggedUserId, otp: enteredOtp }),
                });
    
                const data = await response.json();
                if (!response.ok){
                     throw new Error(data.message || "Invalid OTP");
                }
                console.log(data)
                localStorage.setItem("access_token", data.access);
                showToastMessage("OTP Verified Successfully!", "success");
                
                navigate('/reset-password', { state: { user: loggedUserId } });
    
            } catch (error) {
                showToastMessage(error.message, "danger");
            }finally{
                setLoading(false)
            }

        }
        
    };

    const handleResend = async () => {
        setOtp(["","","","","",""])
        setCanResend(false);
        setTimeLeft(30);

        try {
            const response = await fetch("http://127.0.0.1:8000/AdminUrls/resend_otp/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: loggedUserId }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            showToastMessage("New OTP has been sent to your email.", "success");
        } catch (error) {
            showToastMessage(error.message, "danger");
            setCanResend(true);
        }
    };

    const handleKeyDown =(index,e)=>{
        if(e.key === "Backspace"){
            if(!otp[index] && index >0){
                inputsRef.current[index-1].focus();
            }
            const newOtp=[...otp]
            newOtp[index]="";
            setOtp(newOtp);
        }

    }

    return (
       
                    <div className="login-container">

                        <div className="login-box">
                            <h2 >Enter OTP</h2>

                            <Form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center mb-3">
                            {otp.map((digit, index) => (
                                <Form.Control
                                    key={index}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index,e)}
                                    onPaste={handlePaste}
                                    className="text-center otp-box"
                                    style={{ width:"40px", height: "40px", fontSize: "15px",margin:'1%'  }}
                                />
                            ))}
                        </div>
                        {/* <Button type="submit" className="button" style={{background:'#ff416c',margin:'1%'}}>
                            Verify OTP
                        </Button> */}

                        <button type="submit" className='login-btn ' disabled={loading}>
                        {loading ? "Verifying..." : "Verify OTP"}
                         </button>

                        {loading && <div className="loader"></div>} 
  

                    </Form>

                    <div className="mt-4">
                         {timeLeft > 0 ? (
                             <p className="text-muted">Resend OTP in {timeLeft}s</p>
                         ) : (
                             <button type="button" onClick={handleResend} disabled={!canResend} className="login-btn">
                                 Resend OTP
                             </button>
                         )}
                     </div>
                        </div>


                     <ToastContainer position="top-end" className="p-3">
                 <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={toastVariant}>
                     <Toast.Body className="text-white">{toastMessage}</Toast.Body>
                 </Toast>
            </ToastContainer>

                    </div>
               
           

     
    );
};

export default VerifyOTP;