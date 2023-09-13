// TimeAvailableData.js
import { useState } from 'react';
import moment from 'moment';
import axios from "axios";
import './styles/TimeAvailable.css';

const useTimeAvailableData = () => {
  const [times, setTimes] = useState([]);
  const [timedata, setTimedata] = useState([]);

  const addTime = async (appointmentTime) => {
    if (appointmentTime) {
      const formattedTime = moment(appointmentTime, 'HH:mm').format('HH:mm');
      setTimes([...times, { time: formattedTime }]);
      console.log(setTimedata)
      setTimedata([...timedata, { time: formattedTime }]);
    }

  };

  return { times, timedata, addTime };
};

export default useTimeAvailableData;
