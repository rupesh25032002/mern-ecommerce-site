import React from 'react'
import styled from 'styled-components'
import MyButton from '../style/Mybutton'
import { useSelector,useDispatch } from "react-redux";
import { setCategoryData, setCategoryValue } from '../../reducer/CategorySlice';
import axios from 'axios';
import { toast } from "react-toastify";
const ManageCategory = ({getAllCategory}) => {
  const allCategoryDetail=useSelector((state)=>state?.category)
  const dispatch=useDispatch();
  const {categoryValue}=allCategoryDetail;
  const token=useSelector((state)=>state.user?.token)
  

   //function to add to new category
  const addCategory=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("/api/v1/category/create-category",{name:categoryValue},{
        headers:{
          "Authorization":token
        }
      })
      if(res.data.success){
        toast.success(res.data.message)
        const data = await getAllCategory();
        if (data?.success) dispatch(setCategoryData(data?.allCategory));
      }
      else{
        toast.error(res.data.message)
      }
    }
    catch(error){
      toast.error(error.response)
    }
  }
  return (
   <>
   <Wrapper className="manage-category ">
                <h1>MANAGE CATEGORY</h1>
                <form  onSubmit={addCategory}>
                  <div>
                    <input
                      type="text"
                      value={categoryValue}
                      onChange={(e)=>dispatch(setCategoryValue(e.target.value))}
                      placeholder="Create New Category"
                    />
                  </div>
                  <div>
                  <button type="submit">Create</button>
                  </div> 
                </form>
            </Wrapper>
   </>
  )
}

export default ManageCategory

const Wrapper=styled.div`
width:100%;
h1{
  font-size:2.5vmax;
  font-weight:bold;
}
form{
  >div:first-child{
    border:2px solid grey;
    border-radius:4px;
    margin-bottom:1vmax;
    input{
      width:100%;
      border:none;
      font-size:1.3vmax;
      padding:0.5vmax 1vmax;
    }
  }
  >div:last-child{
    button{
    
      padding:0.7vmax;
      font-size:1.2vmax;
      font-weight:bold;
      color:white;
      background-color:rgb(215, 0, 73);
      border:0;
      border-radius: 3px;
      pointer:cursor;
    }
  }
}

@media (max-width:600px){
  form{
    >div:first-child{
      input{
        font-size:1.6vmax;
      }
    }
    >div:last-child button{
    font-size:1.5vmax;
    }
  }
}
`;