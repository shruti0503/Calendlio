import React, { useState,useEffect } from 'react';
import './styles/bookingPage.css';
import moment from 'moment';
import axios from "axios";
// import { emailConsultant } from './getStarted';
import { auth } from '../firebase'; // Import Firebase Authentication
import ConfirmationModal from './confirmationmodel';
import './book.css'


function AppointmentApp(times) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [emailConsultant, setEmailConsultant] = useState('');
  const [resp, setResp] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  // Function to add a selected time slot
  const addSelectedTimeSlot = (timeSlot) => {
    setSelectedTimeSlots([...selectedTimeSlots, timeSlot]);
  };

  // Function to remove a selected time slot
  const removeSelectedTimeSlot = (timeSlot) => {
    const updatedTimeSlots = selectedTimeSlots.filter(
      (slot) => slot !== timeSlot
    );
    setSelectedTimeSlots(updatedTimeSlots);
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'firstName') setFirstName(value);
    if (name === 'lastName') setLastName(value);
    if (name === 'email') setEmail(value);
  };

  const handleDateChange = (date) => {
    setAppointmentDate(date);
  };

  const handleTimeChange = (time) => {
    setAppointmentTime(time);
  };

  useEffect(() => {
    // Set up a listener for authentication changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setEmailConsultant(user.email);
      } else {
        // User is signed out
        // setEmailId(""); // Clear the email in state
        console.log("ni hui set")
      }
    });
    console.log("GetStarted component has mounted");

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);


  const handleSubmit = async () => {
    const bookingData = {
      firstName,
      lastName,
      email,
      appointmentDate,
      appointmentTime,
      emailConsultant

    };

    try {
      const response = await axios.post("http://localhost:4000/schedule_event", bookingData);
      console.log(response.data);
      setResp('ho gya'); 
      console.log(resp)
      setIsModalOpen(true); // Open the modal

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="appointment-container">
      <h1 className="appointment-heading">Appointment Booking</h1>
      <form className="appointment-form">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Appointment Date:
          <input
            type="date"
            name="appointmentDate"
            // value={appointmentDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </label>
        <br />
        <label>
          Appointment Time:
          <input
            type="time"
            name="appointmentTime"
            value={appointmentTime}
            onChange={(e) => handleTimeChange(e.target.value)}
          />
          
        </label>
        <br/>

        <button
          type="button"
          onClick={handleSubmit}
          className="book-appointment-button"
        > 
         Book Appointment
        </button>
      </form>

  

      {resp ? (
        <>
        <ConfirmationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      firstName={firstName}
      lastName={lastName}
      email={email}
      appointmentDate={moment(appointmentDate).format('MMMM D, YYYY')}
      appointmentTime={appointmentTime}
    />
        </>

      ):
      (
        <>
        </>
        
      )}
    </div>
  );
}

export default AppointmentApp;
