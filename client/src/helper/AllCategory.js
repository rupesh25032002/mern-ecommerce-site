 import axios from "axios";
import { useSelector } from "react-redux";
 //to get all categories
 const getAllCategory=async()=>{
  try{
    const res=await axios.get("/api/v1/category/getall-category");
    return res?.data;
  }
  catch(error){
   console.log(error)
  }
}

export default getAllCategory;