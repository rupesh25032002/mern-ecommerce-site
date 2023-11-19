import axios from "axios";
//to get all categories
const getAllProduct=async()=>{
 try{
   const res=await axios.get("/api/v1/product/getall-product");
   return res?.data;
 }
 catch(error){
  console.log(error)
 }
}

export default getAllProduct;