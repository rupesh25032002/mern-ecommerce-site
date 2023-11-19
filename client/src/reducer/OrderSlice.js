import { createSlice } from "@reduxjs/toolkit";
const initialState={
  userOrderDetail:[],
  adminOrderDetail:[]
}

const userOrderData=createSlice({
  name:"userorder",
  initialState,
  reducers:{
    setUserOrderData(state,action){
      return{
        ...state,
        userOrderDetail:[...action.payload]
      }
    },
    setAdminOrderData(state,action){
      return{
        ...state,
        adminOrderDetail:[...action.payload]
      }
    }
  }
})

export default userOrderData.reducer;
export const {setUserOrderData,setAdminOrderData}=userOrderData.actions;