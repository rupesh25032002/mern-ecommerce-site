import { createSlice } from "@reduxjs/toolkit";

const initialState={
  allCartItem:[],
}
const cartData=createSlice({
  name:"cartitem",
  initialState,
  reducers:{
    setCartData(state,action){
      localStorage.setItem("cartItem",JSON.stringify(action.payload))
      return{
        ...state,
        allCartItem:[...action.payload],
      }
    },
  }
})

export const {setCartData} = cartData.actions
export default cartData.reducer