import React, { createContext, useEffect, useState } from 'react';
import months from '../constants/months';
import Sound from '../assets/ring.mp3';
import loud from  "../assets/loudring.mp3";
const notifi = new Audio(Sound);
const ring = new Audio(loud);
export const AlarmContext = createContext();
const getData=(setdata,link)=>{
  fetch(link
  ,{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }
  )
    .then(function(response){
      
      return response.json();
    })
    .then(function(myJson) {
      
      setdata(myJson)
    });
}
function Alarm({ children }) {
  const [hourDigital, setHourDigital] = useState('');
  const [minutesDigital, setMinutesDigital] = useState('');
  const [secondDigital, setSecondDigital] = useState('');
  const [amPm, setAmPm] = useState('');
  const [dayNow, setDayNow] = useState('');
  const [monthNow, setMonthNow] = useState('');
  const [yearNow, setYearNow] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [hasAlarm, setHasAlarm] = useState(false);
  const [data,setdata] = useState({})
  const [timeline,settimeline] = useState("")
  
  getData(setdata,"https://api.npoint.io/7cdea25f07d61d8d3e5d")

  if(timeline !=  ""){
    setTimeout(() => {
      settimeline("")
    }, 10000);
  }
  
  useEffect(() => {
    setInterval(() => {
      let date = new Date();
      let HH = date.getHours();
      let MM = date.getMinutes();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let sec= date.getSeconds()
      let ampm;

      if (HH >= 12) {
        HH = HH - 12;
        ampm = 'PM';
      } else {
        ampm = 'AM';
      }
      if (HH === 0) HH = 12;
      if (HH < 10) HH = `0${HH}`;
      if (MM < 10) MM = `0${MM}`;
      if (sec < 10) sec = `0${sec}`;
      setSecondDigital(sec);
      setHourDigital(HH);
      setMinutesDigital(MM);
      setAmPm(ampm);
      setDayNow(day);

      setMonthNow(months[month]);
      setYearNow(year);
    }, 1000);
  }, []);
  var time = `${hourDigital}:${minutesDigital}:${secondDigital} ${amPm}`
  if (Object.keys(data).includes(time)) {
   
    if(data[time].split("_")[1] == "s"){
      ring.play();
      ring.loop(true);
    }else{
      notifi.play();
      notifi.play();
    }
    if(timeline == ""){
      settimeline(data[time].split("_")[0])
    }
    
  }
  return (
    <AlarmContext.Provider
      value={{
        hourDigital,
        minutesDigital,
        secondDigital,
        amPm,
        dayNow,
        monthNow,
        yearNow,
        timeline
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
}

export default Alarm;
