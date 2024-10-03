import React from "react";
import './styles/home.css';
import cal from '../images/cal.png'
import orgImage from '../images/org.jpg';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { auth } from './../firebase.js';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


function Home(){

    const navigate = useNavigate();

  // Check if the user is logged in and perform redirection
  useEffect(() => {
    const user = auth.currentUser;
    console.log("user is", user)

    if (user) {
      navigate('/get-started');
    }
  }, [navigate]);


    return (
        <div className="main" style={{ backgroundImage:`url(${orgImage})` }}>
            <div className="left-cont">
                <div className="left-cont-main">
                    <div className="first">Streamline Your Time:</div>
                    <div className="slogan"><h1> Calendlio </h1></div>
                    <div className="slogan-line">
                        <h3>
                            -Where Scheduling Meets Simplicity!
                            <br /> 
                            <br />
                            <p className="about">Calendlio is your trusted appointment scheduling solution, designed for seamless booking. 
                            Enjoy convenience and efficiency in managing your appointments effortlessly.</p>
                        </h3>
                    </div>
                    
                    <div className="enter">
                        {/* <input type="text" className="email-enter" placeholder="Enter your email" /> */}
                        <button className="btn"><Link to="/signup">Sign Up</Link></button>
                    </div>
                </div>
            </div>
            
            <div className="right-cont">
                <div className="calender-image-container">
                    <img className="calender-image" src={cal} alt="Calendar" />
                </div>
            </div>
        </div>
    )
}

export default Home;
