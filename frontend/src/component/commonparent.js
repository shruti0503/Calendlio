// CommonParent.js (Shared State)
import React, { useState } from "react";

function CommonParent() {
  const [times, setTimes] = useState([]);

  // Function to update the times state
  const updateTime = (newTime) => {
    setTimes([...times, { time: newTime }]);
  };

  return (
    <div>
      {/* Render the TimeAvailable component and pass the times state and update function */}
      <TimeAvailable times={times} updateTime={updateTime} />
      
      {/* Render any other components that need access to the times state */}
      {/* <OtherComponent times={times} /> */}
    </div>
  );
}

export default CommonParent;
