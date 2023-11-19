import React from "react";
import styled from "styled-components";
import MyButton from "../style/Mybutton";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { useSelector,useDispatch } from "react-redux";
import {setCategoryData, setPopupUpdateCategory,setUpdateCategoryName } from "../../reducer/CategorySlice";
import getAllCategory from "../../helper/AllCategory";
const UpdateCategory = () => {
  const token = useSelector((state) => state?.user?.token);
  const dispatch=useDispatch();
  const allCategoryDetail=useSelector((state)=>state?.category)
  const {updateId,updateCategoryName}=allCategoryDetail;

  //on submit
  const getUpdateCategory=async(e)=>{
    e.preventDefault();
    try{
     const res=await axios.put(`/api/v1/category/update-category/${updateId}`,{name:updateCategoryName})
     if(res.data.success){
       toast.success(res.data.message)
       dispatch(setPopupUpdateCategory(false))
       const data=await getAllCategory();
       dispatch(setCategoryData(data?.allCategory))
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
    <Wrapper>
      <div className="manage-category border-bottom border-dark">
        <div className="">
          <div className="cancel" onClick={() =>dispatch(setPopupUpdateCategory(false))}>
            <RxCross2 />
          </div>
          <h4>UPDATE CATEGORY</h4>
          <form className="mb-4" onSubmit={getUpdateCategory}>
            <div class="form-group border border-dark rounded mb-2">
              <input
                type="text"
                value={updateCategoryName}
                onChange={(e) => dispatch(setUpdateCategoryName(e.target.value))}
                className="form-control"
                placeholder="Update Category"
              />
            </div>
            <MyButton type="submit">Update</MyButton>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default UpdateCategory;

const Wrapper = styled.div`
  width: 100vw;
  z-index: 1111;
  height: 100vh;
  position: fixed;
  top: 0px;
  right: 0px;
  background-color: white;
  border: 2px solid;
  .manage-category {
    background-color: #fdfdfd;
    padding: 20px;
    width: 40vw;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid black;
  }

  .cancel {
    position: absolute;
    top: 3px;
    right: 3px;
    font-size: 1.5em;
  }
  input {
    &:focus {
      outline: none !important;
      box-shadow: none;
      border: 1px solid black;
    }
  }

  @media (max-width: ${({ theme }) => theme.responsive.Medium}) {
    font-size: 13px;
    .manage-category {
      width: 90vw;
    }

    h4 {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;
