import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import Authdetails from './authDetails.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css'
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  let user = auth.currentUser;

   
  
    function checkSignIn(){
      user = auth.currentUser;
      if (user) {
        navigate('/get-started')
      }
    }


  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then(()=>{
      navigate('/');
    })
    .catch((error)=> console.log(error))

      
  }

  return (
    <div className='main-cont'>
    <div className='sign-in-container'>
      <form onSubmit={signUp}>
        <h1>SignUp</h1>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">SignUp</button> {/* Use type="submit" for the button */}
      </form>
      <Authdetails />
    </div>
    </div>
    
  );
};

export default SignUp;
