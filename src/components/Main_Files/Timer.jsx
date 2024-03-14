import React, { useState, useEffect } from 'react';

function Timer(props) {
  return (
    <div>
      <h2 className="stats">{props.time}</h2>
    </div>
  );
}

export default Timer;