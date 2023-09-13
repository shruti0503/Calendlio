import React, { useState } from "react";
// import "./styles/TimeAvailable.css";
import moment from "moment";
import axios from "axios";
import TimeSlots from "./TimeSlots";
import {Slotss} from "./timeslostforconsulatation";
import Add from "./timeslostforconsulatation";


function TimeAvailable() {
  const [appointmentTime, setAppointmentTime] = useState("");
  const [times, setTimes] = useState([]);
  const [timedata, setTimedata] = useState([]);

  const handleTimeChange = (time) => {
    // Format the time before setting it in the state
    const formattedTime = moment(time, "HH:mm").format("HH:mm");
    setAppointmentTime(formattedTime); // Update the state
    
  };

  const addTime = async () => {
    if (appointmentTime) {
      const formattedTime = moment(appointmentTime, "HH:mm").format("HH:mm");
      setTimes([...times, { time: formattedTime }]);
      setTimedata([...timedata, { time: formattedTime }]);
      setAppointmentTime(""); // Clear the input field
    }
    <Add sloss={timedata}/>
  };
  
  

  return (
    <div className="topp-cont">
      <h3 className="head">Set Today's Available Time:</h3>
      <div className="timings">
        <div>
          <input
            type="time"
            name="appointmentTime"
            value={appointmentTime}
            className="select-time"
            onChange={(e) => handleTimeChange(e.target.value)}
          />
          <button onClick={addTime} className="add-time">Add Time</button>
          
            <TimeSlots times={times} /> {/* Pass the times prop to TimeSlots */}
          
        </div>
      </div>
    </div>
  );
}


export default TimeAvailable;
// export { timedata };

