import React from "react";
import moment from 'moment';
import './styles/TimeAvailable.css';
import { timedata } from "./timeAvailable";

function TimeSlots(props) {
  return (
    <div className="times">
      {props.times.map((timeObj, index) => (
        <div className="time-box" key={index}>
          {moment(timeObj.time, 'HH:mm').format('hh:mm A')}
        </div>
      ))}
    </div>
  );
}

export default TimeSlots;