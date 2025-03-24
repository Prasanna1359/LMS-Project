import React, { useEffect, useState } from "react";
import "../css/ProfilePage.css"
import profileLogo from "./assests/profileLogo.jpg"
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const email = localStorage.getItem("email"); // Fetch email from localStorage
    const token=localStorage.getItem("access_token")
    const navigate=useNavigate()

    useEffect(() => {
        fetchProfile();
        
    }, [email]);

    const fetchProfile =async() =>{

        if(!token){
            console.log("no token")
            return
        }
        if (email) {

            try{
                const resonse=await fetch(`http://127.0.0.1:8000/AdminUrls/profile/${email}/`,{
                    method:"GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${ token }`,
                      }
    
                })
    
                const data=await resonse.json()
                    
                setProfile(data)
                  

            }catch(e){
                console.log(e)
            }
            
        }
    }

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
           <div className='me-3 arrow'><FaArrowLeft onClick={() => navigate('/student-home')} /></div>
            <div className="profile-card">
                <img 
                    src={profileLogo} 
                    alt="Profile" 
                    className="profile-picture"
                />
                <h2>{profile.student_name}</h2>
                <p><b>Email:</b> {profile.email}</p>
                <p><b>Joined Date:</b> {profile.joined_date}</p>
                <p><b>End Date:</b> {profile.end_date}</p>
                <p><b>Courses Enrolled:</b>
                <ul>
                    {profile.course_display.map((course, index) => (
                        <li key={index}>{course}</li>
                    ))}
                </ul>
                
                </p>
                
            </div>
        </div>
    );
};

export default ProfilePage;
