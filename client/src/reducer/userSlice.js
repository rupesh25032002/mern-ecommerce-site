import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState={
  user:null,
  token:null,
}
const userData=createSlice({
  name:"userdetail",
  initialState,
  reducers:{
    setData(state,action){
      return{
        ...state,
        user:action.payload.user,
        token:action.payload.token,
      }
    },
    removeData(state,action){
      return{
        ...state,
        user:null,
        token:null,
      }
    }
  }
})



export const {setData,removeData} = userData.actions
export default userData.reducer