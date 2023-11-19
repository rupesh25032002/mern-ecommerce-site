import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState={
  allProduct:[],
  allFilterProduct:[],
  allSimilarProduct:[],
  allReview:[],
  createProduct:{
    category:"",
    photo:"",
    name:"",
    description:"",
    price:"",
    quantity:"",
    shipping:"",
  }
}
const productData=createSlice({
  name:"userdetail",
  initialState,
  reducers:{
    setCreateProduct(state,action){
      const {category,photo,name,description,price,quantity,shipping}=action.payload;
      return{
        ...state,
        createProduct:{
          ...state.createProduct,
          category,
          photo,
          name,
          description,
          price,
          quantity,
          shipping
        }
      }
    },
    setProductData(state,action){
      console.log(action.payload)
      return{
        ...state,
        allProduct:[...action.payload]
      }
    },
    setSimilarProductData(state,action){
      console.log(action.payload)
      return{
        ...state,
        allSimilarProduct:[...action.payload]
      }
    },
    setFilterProductData(state,action){
      console.log(action.payload)
      return{
        ...state,
        allFilterProduct:[...action.payload]
      }
    },
    setProductReview(state,action){
      return{
        ...state,
        allReview:[...action.payload]
        
      }
    },
  }
})

export const {setCreateProduct,setProductData,setFilterProductData,setSimilarProductData,setProductReview} = productData.actions
export default productData.reducer