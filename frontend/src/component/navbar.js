import React, { useContext, useEffect, useState } from 'react';
import './styles/navbar.css';
import cal from '../images/cal.png';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase Authentication
import SignIn from './auth/SignIn';
// import { useHistory } from 'react-router-dom';
import { onAuthStateChanged, signOut, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { createBrowserHistory } from 'history';
import LogIn from './auth/SignIn';

function Navbar() {
  
  let user = auth.currentUser; // Check if a user is logged in
  const showAlert = () => {
    alert("Please log in or sign up to get started.");
  };

  const [authUser, setAuthUser]= useState(null);
  const navigate = useNavigate();

  useEffect(()=>{

      const listen =onAuthStateChanged(auth, (user)=>{
        if(user){
          setAuthUser(user);
        }
        else{
          setAuthUser(null);
          
        }
    })
  

    return ()=>{
      listen();
    };

  },[]);

  const userSignOut=()=>{
    signOut(auth)
    .then(()=>{
      console.log('signed out');
      navigate('/');
    })
    .catch((error)=> console.log(error))

  }

  const dashboard=()=>{
     navigate('/get-started')
  }
    
  

  // Use the useNavigate hook to perform redirectiod

  return (
    <nav className="navbar">
      <div className="logo">Calendlio</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">Individuals</a></li>
        <li><a href="/services">Teams</a></li>
        <li><a href="/contact">Resources</a></li>
      </ul>
      <div className="button-container">
         <div>
          {authUser ? (
            <>
            <button className="logout-button" onClick={userSignOut}>
              Sign Out
            </button>
            </>
          ):(
            <>

            </>
          )}

          {authUser ? (
            <>
            <button className="get-started-button" onClick={dashboard}>
              Get Started
            </button>
            
            </>
          ):(
            <>

            </>
          )}


         </div>

      </div>
    </nav>
  );
}

export default Navbar;
