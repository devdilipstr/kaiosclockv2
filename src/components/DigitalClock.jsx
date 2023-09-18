import React, { useContext } from 'react';
import { AlarmContext } from '../context/Alarm';
import './digitalClock.css';

const DigitalClock = () => {
  const { hourDigital, minutesDigital,secondDigital, amPm, dayNow, monthNow, yearNow,timeline} =
    useContext(AlarmContext);

  return (
    <div>
      <div className="clock-text">
        <div className="clock-text-hour">{`${hourDigital}:`}</div>
        <div className="clock-text-minutes">{minutesDigital}</div>
        <div className="clock-text-minutes">{`:${secondDigital}`}</div>
        <div className="clock-text-ampm">{amPm}</div>
      </div>
      <div className="clock-date">
        <span>{`${dayNow} `}</span>
        <span>{`${monthNow} , `}</span>
        
        <span>{yearNow}</span>
        <br/>
        <span>{timeline}</span>
         
        
      </div>
    </div>
  );
};

export default DigitalClock;
