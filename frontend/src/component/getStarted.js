import React, { useEffect, useState } from "react";
import './styles/Main.css';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import orgImage from '../images/org.jpg';
import './styles/Main.css';
import { auth } from '../firebase'; // Import Firebase Authentication
import TimeAvailable from './timeAvailable'; // Import the TimeAvailable component
import './styles/TimeAvailable.css';
import axios from "axios";
import clipboardCopy from 'clipboard-copy';
let emailConsultant = "";

function GetStarted(props) {
  const log = () => {
    console.log("in Get started");
  }

  const [emailId, setEmailId] = useState(""); // State to store the email
  const [Name, setName]= useState("")
  const [imageUrl, setimageUrl]=useState("");
  const [linkToCopy, setLinkToCopy] = React.useState('http://localhost:4000/google'); // Replace with your link

  const copyToClipboard = () => {
    clipboardCopy(linkToCopy)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy link: ', error);
      });
  };
  

  useEffect(() => {
    // Set up a listener for authentication changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        const userEmail = user.email;
        setEmailId(userEmail); // Update the email in state
        const userName=user.displayName;
        setName(userName);
        const userImage=user.photoURL
        setimageUrl(userImage);
      } else {
        // User is signed out
        setEmailId(""); // Clear the email in state
      }
    });
    console.log("GetStarted component has mounted");

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const booking_details = [
    {
      heading: "15 Minute Meeting",
      link: uuidv4()
    },
    {
      heading: "30 Minute Meeting",
      link: uuidv4()
    },
    {
      heading: "60 Minute Meeting",
      link: uuidv4()
    },
  ];

  const handleSubmit = async (userEmail) => {
    const emialconsult = {
      emailConsultant: userEmail // Pass the user's email directly
    };
    try {
      const response = await axios.post("http://localhost:4000/send-email-consultant", emialconsult);
      console.log("consultant email sent");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      console.log("consultant email not sent");
    }
  }

  return (
    <div className={`main-cont fade-in`} onLoad={log}  style={{ backgroundImage:`url(${orgImage})` }}>
      <div className={`top-cont fade-in`}>
        <div className="index">
        <h2 className="head-cal">My Calendlio</h2>
        <hr style={{ color: 'black' }} /> 
        <div className="info">
          <div>Event Types</div>
          <div>Scheduled Events</div>
          <div>WorkFlows</div>
        </div>

        </div>
        
        <div className="user-details">
          <div className="profile">
          <div className="UserNameAndPic">
          <h4>Welcome <span style={{ color: 'Blue' }}>{Name}</span>!</h4> <img src={imageUrl}></img>

          </div>
          <h5>{emailId}</h5>
        </div>
        </div>
      </div>
      <TimeAvailable isBookingPage={true} />
      <div className={`bottom-cont fade-in`}>
        {booking_details.map((booking, index) => (
          <div className={`boxes fade-in`} key={index}>
            <div className="meeting-time">{booking.heading}</div>
            <div className="persons">One-to-One</div>
            <div className="buttons">
            <div className="link">
             <button onClick={() => handleSubmit(emailId)}> <Link to='http://localhost:4000/google'>Book Now</Link></button>
             {/* */}
            </div>
            <div>
           <button onClick={copyToClipboard}>Copy Link</button>
           </div>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { GetStarted, emailConsultant };
