import React, { useEffect, useState } from "react";
import './styles/Main.css'; // Import your CSS file if you have one
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import './styles/Main.css';
import { auth } from '../firebase'; // Import Firebase Authentication
import { useParams } from 'react-router-dom';



function GetStarted(props) {
  const { uuid } = useParams();

    const [emailId, setEmailId] = useState(""); // State to store the email

    useEffect(() => {
      // Set up a listener for authentication changes
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          const userEmail = user.email;
          setEmailId(userEmail); // Update the email in state
        } else {
          // User is signed out
          setEmailId(""); // Clear the email in state
        }
      });
  
      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }, []);
  

  const booking_details = [
    {
      heading: "15 Minute Meeting",
      link: uuidv4(), // Generate a unique ID for each booking
    },
    {
      heading: "30 Minute Meeting",
      link: uuidv4(),
    },
    {
      heading: "60 Minute Meeting",
      link: uuidv4(),
    },
  ];

  return (
    <div className="main-cont">
      <div className="top-cont">
        <h2 className="head">My Calendlio</h2>
        <div className="info">
          <div>Event Types</div>
          <div>Scheduled Events</div>
          <div>WorkFlows</div>
        </div>
      </div>

      <div className="middle-cont">
        <div className="user-details">
          {/* <h4>{name}</h4> */}
          <h5>{emailId}</h5>
        </div>
      </div>

      <div className="bottom-cont">
        {booking_details.map((booking, index) => (
          <div className="boxes" key={index}>
            <div className="meeting-time">{booking.heading}</div>
            <div className="persons">One-to-One</div>
            <div className="link">
              {/* Use the Link component if you are using React Router */}
              <Link to={`/booking-page/${booking.link}`}>Book Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetStarted;
