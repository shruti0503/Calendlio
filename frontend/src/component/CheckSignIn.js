import React, { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { createBrowserHistory } from 'history';
import { auth } from '../firebase'; // Import Firebase Authentication
const history = createBrowserHistory();

function CheckSignIn(){

  const user = auth.currentUser; // Check if a user is logged in
  const showAlert = () => {
    alert("Please log in or sign up to get started.");
  };
  const [authUser, setAuthUser]= useState(null);

  useEffect(()=>{
      const listen =onAuthStateChanged(auth, (user)=>{
        if(user){
          setAuthUser(user);
          history.push('/get-started');
        }
        else{
          setAuthUser(null);
        }
    })
  

    return ()=>{
      listen();
    };

  },[]);

}