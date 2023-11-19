import React from 'react'
import Layout from '../../components/Layout'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
const Register = () => {
  const[userDetail,setUserDetail]=useState({
    name:"",
    email:"",
    password:"",
    address:"",
    phone:"",
    question:"",
  })
  const{name,email,password,address,phone,question}=userDetail;
  const navigate=useNavigate();

  //onsubmit function
  const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    if(formValidation()){
     const res = await axios.post("/api/v1/auth/register",{
      name,email,password,address,phone,question
     })
     if(res.data.success){
       navigate("/login")
       toast.success(res.data.message)
      }
      else{
        toast.error(res.data.message)
      }
    }
  }
  catch(error){
    toast.error(error.response.data.message)
  }
  }
  
  //form validation
  const formValidation=()=>{
    const nameRegex=/^[a-zA-z]{3,15}$/;
    const emailRegex=/^[a-zA-Z1-9]+\@[a-zA-z]+\.[a-zA-Z]+$/;
    const passwordRegex=/^[a-zA-z1-9_@#]{3,}$/;
    const phoneRegex=/^[0-9]{10}$/;

   
    if(!nameRegex.test(name)){
      toast.error("name is invalid")
      return false
    } 
    if(!emailRegex.test(email)){
      toast.error("Email is invalid")
      return false
    } 
    if(!passwordRegex.test(password)){
      toast.error("Keep strong password")
      return false
    } 
    if(address==""){
      toast.error("Address is invalid")
      return false
    } 
    if(!phoneRegex.test(phone)){
      toast.error("Phone number is not valid")
      return false
    } 
    if(question==""){
      toast.error("Answer is invalid")
      return false
    } 
    return true
  }
  return (
   <Layout>
    <Wrapper>
   <div className="container">
  <div className="row justify-content-center">
    <div className="col-lg-6 col-md-8 col-sm-10 form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-center">Register</h1>
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
        <div className="form-group">
          <input type="text" className="form-control" id="phone" placeholder="What is your favorite movie?" value={question} 
          onChange={(e)=>setUserDetail({...userDetail,question:e.target.value})} />
        </div>
        <button type="submit" className="btn btn-block">Register</button>
        <NavLink className="login-link" to="/login">Already User? Login</NavLink>
      </form>
    </div>
  </div>
  </div>
</Wrapper>

   </Layout>
  )
}

export default Register

const Wrapper=styled.div`
background-color: rgb(215, 0, 73);
.form-container{
    display: flex;
    padding: 56px 0px;
    justify-content: center;
    margin: 40px 0px;
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
.login-link{
  margin:auto;
  margin-top:10px;
  text-decoration:none;
  color:grey;
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

