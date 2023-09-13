import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase.js';
import Authdetails from './authDetails.jsx';


function LogIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    // To do signIn
    e.preventDefault();
    // Help create the signIn functionality
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        alert("We couldn't find an account with this emailId or you entered a wrong password.");
        console.log(error);
      });
  }

  return (
    <div className='main-cont'>
    <div className='sign-in-container'>
      <form onSubmit={signIn}>
        <h1>Login</h1>
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
        <button onClick={signIn}>LogIn</button> {/* Added onClick handler */}
      </form>
      <Authdetails/>
    </div>
    </div>
  );
};

export default LogIn;
