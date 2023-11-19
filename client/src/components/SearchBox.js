import React from 'react'
import styled from "styled-components";
import { Input, Space } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { setKeyword,setSearchProduct } from '../reducer/SearchSlice';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const { Search } = Input
const SearchBox = (value) => {
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const searchData=useSelector((state)=>state?.search)
  const {keyword,searchProduct}=searchData;

  //search function
  const onSearch=async(value)=>{
    if(value!==""){
      dispatch(setKeyword(value))
        try {
         const res = await axios.post("/api/v1/product/search-product",{keyword})
         if(res?.data?.success){
           dispatch(setSearchProduct(res?.data?.product))
           navigate("/searchproduct")
         }
        
        } catch (error) {
         console.log(error)
        }
    }
  }

  return (
  <>
   <Wrapper className="searchbar mt-3 mb-3">
          <Search
      placeholder="Search Products"
      allowClear
      className="searchinput"
      enterButton
      size="large"
      onSearch={(value)=>onSearch(value)}
      // onChange={(e)=>setSearch(e.target.value)}
      />
       
      </Wrapper>
  </>
  )
}

export default SearchBox

const Wrapper=styled.div`
.searchbar{
  display:flex;
  align-items:center;
  justify-content:center;
}

.searchinput{
  
}

.ant-btn {
  background-color: rgb(215, 0, 73);
  display:flex;
  align-items:center;
}
.ant-btn:focus {
  background-color: rgb(215, 0, 73) !important;
  box-shadow: none !important;
}

@media (max-width: ${({ theme }) => theme.responsive.Medium}){

}
`;