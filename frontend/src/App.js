import React from 'react';
import Navbar from './component/navbar';
import './App.css';
import Home from './component/homepage';
import LogIn from './component/auth/SignIn.jsx';
import SignUp from './component/auth/signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authdetails from './component/auth/authDetails';
import { GetStarted, emailConsultant } from './component/getStarted';
import AppointmentApp from './component/bookingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {/* Use a <Routes> component to define your routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/booking-page/:uuid" element={<AppointmentApp />} />
          <Route path='/get-started' element={<GetStarted />}  />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
