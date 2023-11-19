import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useSelector,useDispatch } from "react-redux";
import { setCategoryData } from "../../reducer/CategorySlice";
import { toast } from "react-toastify";
import UpdateCategory from "../../components/category/UpdateCategory";
import styled from "styled-components";
import ListCategory from "../../components/category/ListCategory";
import ManageCategory from "../../components/category/ManageCategory";
import { Outlet } from "react-router-dom";
import getAllCategory from "../../helper/AllCategory";
const CreateCategory = () => {

  const token=useSelector((state)=>state.user?.token)
  const dispatch=useDispatch();
  const allCategoryDetail=useSelector((state)=>state?.category)
  console.log(allCategoryDetail)
  const {popupUpdateCategory}=allCategoryDetail;
  

  //function to get all categories
  const getCategory=async()=>{
    try{
      const data=await getAllCategory();
      if(data?.success){
        dispatch(setCategoryData(data?.allCategory))
        toast.success(data?.message)
      }
      else{
        toast.error(data?.message)
      }
    }
    catch(error){
      console.log(error)
     toast.error("Something went wrong")
    }
  }

  useEffect(()=>{
    getCategory();
  },[])
  return (
    <>
    <Layout>
      <Wrapper>
          <AdminMenu/>
          <div>
           <ManageCategory getAllCategory={getAllCategory}/>
           <ListCategory getAllCategory={getAllCategory}/>
          </div>
      </Wrapper>
     {popupUpdateCategory?<UpdateCategory
     getAllCategory={getAllCategory}
     />:null} 
    </Layout>
    <Outlet/>
    </>
  );
};

export default CreateCategory;

const Wrapper=styled.div`
>div{
  width:90vw;
  padding:4vmax;
  margin:auto;
}
@media (max-width:${({ theme }) => theme.responsive.Small}){
>div{
  width:100%;
  padding:1vmax;
}
}
`;