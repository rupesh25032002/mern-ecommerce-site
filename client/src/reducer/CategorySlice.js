import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState={
  allCategory:[],
  categoryValue:"",
  updateId:"",
  updateCategoryName:"",
  popupUpdateCategory:false
}
const categoryData=createSlice({
  name:"category",
  initialState,
  reducers:{
    setCategoryData(state,action){
      console.log(action.payload)
      return{
        ...state,
        allCategory:[...action.payload]
      }
    },
    setCategoryValue(state,action){
      return{
        ...state,
        categoryValue:action.payload
      }
    },
    setCategoryId(state,action){
      return{
        ...state,
        updateId:action.payload
      }
    },
    setUpdateCategoryName(state,action){
      return{
        ...state,
        updateCategoryName:action.payload
      }
    },
    setPopupUpdateCategory(state,action){
      return{
        ...state,
        popupUpdateCategory:action.payload
      }
    }
  }
})

export const {setCategoryData,setCategoryValue,setCategoryId,setPopupUpdateCategory,setUpdateCategoryName} = categoryData.actions
export default categoryData.reducer