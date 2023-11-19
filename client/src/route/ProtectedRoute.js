import React from 'react'
import Spinner from '../components/Spinner'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Outlet, useNavigate } from 'react-router-dom'
//protected routes
const ProtectedRoute = () => {
 const data=useSelector((state)=>state.user.token)
 return !data?<Outlet/>:<Spinner path="/"/>
}

export default ProtectedRoute
