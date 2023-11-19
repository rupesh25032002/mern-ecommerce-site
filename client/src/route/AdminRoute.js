import React, { useEffect } from 'react'
import Spinner from '../components/Spinner'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const AdminRoute =() => {
  const token=useSelector((state)=>state?.user?.token)
  const [ok,setOk]=useState(false);
  
  const userAuth=async()=>{
    try{
      const res = await axios.get("http://localhost:8080/api/v1/auth/admin-dashboard", {
        headers: {
          "Authorization": token,
        },
      });
      console.log(res.data.success)
     if(res.data.success) setOk(true)
    }
    catch(error){
      console.log(error)
    }  
  }
  useEffect(()=>{
    if(token) userAuth()
  },[token])

 return ok?<Outlet/>:<Spinner path={`${token?"/":"/login"}`}/>
}

export default AdminRoute