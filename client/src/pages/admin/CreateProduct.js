import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import styled from "styled-components";
import {Select} from "antd";
import {useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { setCreateProduct } from "../../reducer/ProductSlice";
import { setCategoryData } from "../../reducer/CategorySlice";
import {toast} from "react-toastify"
import getAllCategory from "../../helper/AllCategory";
import axios from "axios";
const {Option}=Select;


const CreateProduct = () => {
  const allCategory=useSelector((state)=>state?.category?.allCategory)
  const [create, setCreate] = useState({
    category: '',
    photo: '',
    name:"",
    description:"",
    price:"",
    quantity:"",
    shipping:"",
    featured:"",
  });
  const [photoFile,setPhotoFile]=useState("");
  const dispatch=useDispatch();
  const {category,photo,name,description,price,quantity,shipping,featured}=create;
  const data=useSelector((state)=>state.product)
  console.log(data)

  //handle photo change
  const handlePhotoChange=(field,value)=>{
      setPhotoFile(value);
      handleChange(field,URL.createObjectURL(value))
  }
  console.log(photoFile)
  //handle Change
  const handleChange=(field,value)=>{
      setCreate({
        ...create,
        [field]:value,
      })
  }
  //onSubmit 
  const handleClick=async(e)=>{
     e.preventDefault();
    // Create a new FormData object
    console.log(name)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', photoFile);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('shipping', shipping);
    formData.append('category', category);
    formData.append('featured', featured);
    console.log(formData)
     try {
       const res=await axios.post("/api/v1/product/create-product",
         formData
     )
     if(res.data.success){
      toast.success(res.data.message)
     }
     else{
      toast.success(res.data.message)
     }
     dispatch(setCreateProduct(create))
     console.log(res.data)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
  }

   //function to get all categories
   const getCategory=async()=>{
    try{
      const data=await getAllCategory();
      if(data?.success){
        dispatch(setCategoryData(data?.allCategory))
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
        <Wrapper className="container-fluid">
        <AdminMenu />
            <div className="create-product">
            <h1>Create Product</h1>
              <div>
             <select
             placeholder="Select Categories"
             style={{ 
              height:"100%", 
              fontSize:"1.3vmax",
              fontWeight:"bold"
            }}
             name="category"
             value={category}
             onChange={(e)=>handleChange("category",e.target.value)}
             >
                <option value="" disabled selected>Select Category</option>
               {
                allCategory?.map((val)=>{
                  return(
                  <option value={val._id} key={val._id}>
                    {val.name}
                  </option>
                  )
                })
               }
             </select >
              </div>
              <div>
              <label>
               {photoFile?photoFile?.name:"Upload Image"}
              <input 
              type="file" 
              accept="image/*"
              name="photo"
               hidden
               onChange={(e)=>handlePhotoChange("photo",e.target.files[0])}
               />
              </label>
              </div>
              <div >
                <input type="text"
                
                 value={name}
                 onChange={(e)=>handleChange("name",e.target.value)} 
                 placeholder="Name of Product"
                 name="name"
                 />
              </div>
              <div>
                <textarea type="text"
                
                 value={description}
                 onChange={(e)=>handleChange("description",e.target.value)} 
                 placeholder="Description"
                 name="description"
                 ></textarea>
              </div>
              <div>
                <input type="number"
                
                 value={price}
                 onChange={(e)=>handleChange("price",e.target.value)} 
                 placeholder="Product Price"
                 name="price"
                 />
              </div>
              <div>
                <input type="number"
                
                 value={quantity}
                 onChange={(e)=>handleChange("quantity",e.target.value)} 
                 placeholder="Quantity"
                 name="quantity"
                 />
              </div>
              <div>
               <select
                placeholder="Shipping"
                onChange={(e)=>handleChange("shipping",e.target.value)}
                value={shipping}
                name="shipping"
               >
                <option value="" disabled selected>Select Shipping</option>
               <option value="1">yes</option>
               <option value="0">No</option>
               </select>
              </div>
              <div>
               <select
                placeholder="Feature Product"
                onChange={(e)=>handleChange("featured",e.target.value)}
                name="featured"
                value={featured}
               >
                <option value="" disabled selected>Select feature</option>
               <option value="1">yes</option>
               <option value="0">No</option>
               </select>
              </div>
            <div className="submit-btn">
            <input  type="submit" value="Submit"
            onClick={handleClick}
            />
            </div>
            </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default CreateProduct;

const Wrapper = styled.div`
.create-product{
  width:60vw;
  margin:auto;
  padding:1vmax;
  >div{
    border: 2px solid #d5d5d5;
    margin:1.5vmax 0;
    border-radius:3px;
    padding:0.5vmax;
    input,label,textarea,select{
      width:100%;
      border:none;
      padding:0.5vmax;
      font-size:1.2vmax;
      outline:none;
      padding:0.5vmax;
      background-color:transparent;
    }
    label{
      text-align:center;
    }
    textarea{
      height:100px;
    }
  }
  .submit-btn{
    background-color:rgb(215, 0, 73);
    input{
      color:white;
    }
  }
}
>div h1{
  font-size:2.5vmax;
  font-weight:bold;
  text-align:center;
  margin-bottom:2vmax;
  margin-top:2vmax;
}
.select,.input{
  width:100%;
}

 @media(max-width:600px){
    .create-product{
      width:90vw;
    }
  }
`;
