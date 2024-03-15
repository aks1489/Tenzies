import React, { useState, useEffect } from 'react';

function Timer(props) {

  function calculateTime(time) {
    const minute = Math.floor(time / 60);
    const second = time - minute * 60;

    let currentTime;

    if(second < 10) {
      currentTime = `0${minute}:0${second}`
    } else if(minute < 10) {
      currentTime = `0${minute}:${second}`
    } else {
      currentTime = `${minute}:${second}`
    }

    return currentTime;
  }

  
  return (
    <>
      <h2 className="stats">{props.text ? 'Best Time ' : null}{calculateTime(props.time)}</h2>
    </>
  );
}

export default Timer;