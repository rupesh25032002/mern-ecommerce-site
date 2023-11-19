import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Spinner = ({path="/login"}) => {
  const navigate=useNavigate();
  const [count,setCount]=useState(3);
  useEffect(()=>{
  const intervalId=setInterval(()=>{
    setCount((preValue)=>preValue-1)
  },1000)
  if(count===0) navigate(path);
  return(()=>clearInterval(intervalId))
  },[count])

  return (
 <div style={{height:"100vh"}} className="d-flex justify-content-center align-items-center">
  <div className="d-flex justify-content-center align-items-center">
    <h1>You will Redirect in {count}</h1>
    <div className="spinner-border" style={{marginLeft:"10px"}} role="status">
      <span className="sr-only" />
    </div>
  </div>
</div>


  )
}

export default Spinner
