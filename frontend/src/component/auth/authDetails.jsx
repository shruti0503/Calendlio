import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase.js';
import { onAuthStateChanged, signOut, GoogleAuthProvider } from 'firebase/auth';
// Import signInWithPopup from Firebase Authentication module
// import { auth } from '../../firebase.js';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import gg from './google.png'
import AppointmentApp from '../bookingPage.js';
import { emailuser } from '../state.js';


import {
  signInWithPopup, // Import signInWithPopup here
} from 'firebase/auth';
const AuthDetails = () => {
const [authUser, setAuthUser] = useState(null);
const navigate = useNavigate(); // Initialize useNavigate
const [email ,setEmail]=useState('');

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign Out successfully');
      })
      .catch((error) => console.log(error));
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

   await signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful sign-in
        const user = result.user;
        console.log('Sign-in with Google successful');
        console.log('User:', user);
        emailuser=user.email;
        
       
      })
      .catch((error) => {
        // Handle sign-in error
        console.error('Sign-in with Google failed', error);
      });
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
          
        </>
      ) : (
        <>
          <button className='google-signIn' onClick={handleGoogleSignIn}>Sign In with Google<img className='logo' src={gg} /></button>
          <p>Signed Out</p>

         

        </>
        
      )}
    </div>
  );
};

export default AuthDetails;
