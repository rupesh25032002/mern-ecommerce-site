import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import { setData } from '../reducer/userSlice';
const UserProfile = () => {
  const[userDetail,setUserDetail]=useState({
    name:"",
    email:"",
    password:"",
    address:"",
    phone:"",
  })
  const dispatch=useDispatch();
  const userData=useSelector((state)=>state?.user);
  console.log(userData?.user)
  const{name,email,password,address,phone}=userDetail;

  //onsubmit function (update Profile)
  const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
     const res = await axios.put("/api/v1/auth/update-profile",{
      name,email,password,address,phone
     })
     console.log(res?.data?.user)
     if(res.data.success){
       toast.success(res.data.message)
       dispatch(setData({...userData,user:{...userData.user,...userDetail}}))
       localStorage.setItem("userdata",JSON.stringify({...userData,user:{...userData.user,...userDetail}}))
      }
      else{
        toast.error(res.data.message)
      } 
  }
  catch(error){
    toast.error(error?.response?.data?.message)
  }
  }

  useEffect(()=>{
    setUserDetail({
      ...userDetail,
      name:userData?.user?.name,
      email:userData?.user?.email,
      phone:userData?.user?.phone,
      address:userData?.user?.address,
      password:userData?.user?.password
    })
  },[])
  return (
    <Wrapper>
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-center">UserProfile</h1>
        <div className="form-group">
          <input type="text" className="form-control" id="name" placeholder="Name" value={name} 
          onChange={(e)=>setUserDetail({...userDetail,name:e.target.value})}  />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="email" placeholder="Email" value={email}
          onChange={(e)=>setUserDetail({...userDetail,email:e.target.value})}  />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="password" placeholder="Password" value={password}
          onChange={(e)=>setUserDetail({...userDetail,password:e.target.value})}  />
        </div>
        <div className="form-group">
          <textarea type="text" rows="3" className="form-control" id="address" placeholder="Address" value={address} 
          onChange={(e)=>setUserDetail({...userDetail,address:e.target.value})}  />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="phone" placeholder="Phone" value={phone} 
          onChange={(e)=>setUserDetail({...userDetail,phone:e.target.value})} />
        </div>
        <button type="submit" className="btn btn-block">UPDATE PROFILE</button>
      </form>
    </div>
</Wrapper>
  )
}

export default UserProfile

const Wrapper=styled.div`
background-color: rgb(215, 0, 73);
.form-container{
    display: flex;
    justify-content: center;
    background-color:white;
}
.register-form{
  h1{
    font-weight: 700;
    letter-spacing: 3px;
    font-weight:bold;
  }
  width: 80%;
  display: flex;
  flex-direction: column;
 .form-group{
  padding:10px 0px;
  input,textarea{
    &:focus{
     outline:none !important;
     box-shadow:none;
     border:1px solid black;
    }
   }
  }
  .btn{
    background-color:rgb(215, 0, 73);
    color:white;
    margin-top:10px;
  } 

}
@media (max-width:${({ theme }) => theme.responsive.Small}){
  .container{
    width:80% ;
  }
  .register-form{
    width:90%;
  }
}

`;

