import { createSlice } from "@reduxjs/toolkit";


const initialState={
  keyword:"",
  searchProduct:[],
  loading:true
}
const searchProduct=createSlice({
  name:"searchproduct",
  initialState,
  reducers:{
    setKeyword(state,action){
      return{
        ...state,
        loading:true,
        keyword:action.payload,
      }
    },
    setSearchProduct(state,action){
      return{
        ...state,
        loading:false,
        searchProduct:[...action.payload]
      }
    },
  }
})



export const {setKeyword,setSearchProduct} = searchProduct.actions
export default searchProduct.reducer