import React from 'react'
import Layout from '../../components/Layout'
import { useState } from 'react'
import axios from "axios";
import { setData } from '../../reducer/userSlice';
import {useDispatch,useSelector} from "react-redux"
import { NavLink, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
const Login = () => {
  const[userDetail,setUserDetail]=useState({
    email:"",
    password:"",
    question:""
  })
  
  const {email,password,question}=userDetail;
  const navigate=useNavigate()
  //onsubmit function
  const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
     const res = await axios.post("/api/v1/auth/forgetpassword",{
      email,password,question
     })
     if(res.data.success){ 
      navigate("/login")
      toast.success(res.data.message)
      }
      else{
        toast.error(res.data.message)
      }
    }
  catch(error){
    toast.error(error.response.data.message)
  }
  }

  return (
   <Layout>
    <Wrapper>
   <div className="container">
  <div className="row justify-content-center">
    <div className="col-lg-6 col-md-8 col-sm-10 form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-center">RESET</h1>
        <div className="form-group">
          <input type="text" className="form-control" id="email" placeholder="Email" value={email}
          onChange={(e)=>setUserDetail({...userDetail,email:e.target.value})}  />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="email" placeholder="What is your fav movie?" value={question}
          onChange={(e)=>setUserDetail({...userDetail,question:e.target.value})}  />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="password" placeholder="New Password" value={password}
          onChange={(e)=>setUserDetail({...userDetail,password:e.target.value})}  />
        </div>
        <button type="submit" className="btn btn-block">RESET PASSWORD</button>
      </form>
    </div>
  </div>
</div>
</Wrapper>
   </Layout>
  )
}

export default Login

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
  .forgetpassword{
    float: right;
    font-size: 0.9rem;
    text-decoration: none;
    margin: 5px 0px;
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

