import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { GoogleLogin } from '@react-oauth/google';
import '../styles/Hero.css';
import { jwtDecode } from 'jwt-decode';


function Hero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
  const [profile, setProfile] = useState([]);
  

  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    gsap.to('.hero h1', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2
    });

    gsap.to('.hero p', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.4
    });

    gsap.to('.cta-button', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.6
    });

    gsap.to('.google-login', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.8
    });

    // Redirect to home if authenticated
    if (isAuthenticated) {
      console.log('User isAuthenticated: effect', isAuthenticated);

      navigate('/home', { state: { profile, isAuthenticated } });
    }
  }, [isAuthenticated, navigate]);




  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    const decoded = jwtDecode(credentialResponse.credential);

    // Extracting the email and name
    const userEmail = decoded.email;
    const userName = decoded.name;
    console.log('User email:', userEmail);
    console.log('User name:', userName);
    setProfile({ userEmail, userName, isAuthenticated:true })

    setIsAuthenticated(true); // Update state on successful login
    console.log('User isAuthenticated:', isAuthenticated);

    
  };

  const handleGoogleLoginFailure = () => {
    console.log('Google Login Failed');
  };

  return (
    <section className="hero">
      <h1>Organize Your Life with Agile To-Do</h1>
      <p>The simple, powerful todo app that helps you get things done</p>
      

      <div className="cta-button">
        {/* <GoogleLogin
        
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        /> */}

<GoogleLogin
    onSuccess={handleGoogleLoginSuccess}
    onError={handleGoogleLoginFailure}
    
    
  />
      </div>
    </section>
  );
}

export default Hero;
