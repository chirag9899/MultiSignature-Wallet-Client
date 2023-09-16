import React, { useEffect, useState } from 'react'

const ExpirationCounter = ({proposal}) => {
    const expirationTime=(proposal.expires.at_time/1000000000) *1000
    console.log(proposal.expires.at_time) 
    const [remainingTime,setRemainingTime]=useState(expirationTime - Date.now())

    useEffect(()=>{
        const timer=setInterval(()=>{
            const newTimeRemain=expirationTime-Date.now()
            setRemainingTime(newTimeRemain)
            if(newTimeRemain <= 0){
                clearInterval(timer);
            }
        },1000)

        return ()=>{
            clearInterval(timer)
        }
    },[Date.now()])

    const formatTime = (timeInSeconds) => {
        const days = Math.floor(timeInSeconds / 86400);
        const hours = Math.floor((timeInSeconds % 86400) / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
    
        return `${days} days ${hours.toString().padStart(2, '0')} hr ${minutes.toString().padStart(2, '0')} min ${seconds.toString().padStart(2, '0')} sec`;
      };
  return (
    <div>
        <p>Expires In : {formatTime(Math.ceil(remainingTime/1000))}</p>
    </div>
  )
}

export default ExpirationCounter