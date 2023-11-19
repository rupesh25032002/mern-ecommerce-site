import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import styled from "styled-components";
import {Select} from "antd";
import {useState} from "react";
import MyButton from "../../components/style/Mybutton";
import { useDispatch,useSelector } from "react-redux";
import { setCreateProduct, setProductData } from "../../reducer/ProductSlice";
import { setCategoryData } from "../../reducer/CategorySlice";
import {toast} from "react-toastify"
import getAllCategory from "../../helper/AllCategory";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import getAllProduct from "../../helper/AllProduct";
const {Option}=Select;

const UpdateProduct = () => {
  const allCategory=useSelector((state)=>state?.category?.allCategory)
  const [create, setCreate] = useState({
    category:"",
    photo:null,
    name:"",
    description:"",
    price:"",
    quantity:"",
    shipping:"",
    productId:"",
    categoryId:"",
  });
  const {category,photo,name,description,price,quantity,shipping,productId,categoryId}=create;
  const dispatch=useDispatch()
  const data=useSelector((state)=>state.product)
  const params=useParams();
  const navigate=useNavigate()

  //get single product
  const getSingleProduct=async()=>{
    try {
      const res=await axios.get(`/api/v1/product/getsingle-product/${params.slug}`);
      console.log(res.data)
      
      if(res?.data?.success){
        const {_id,name,description,price,quantity,shipping,photo,category}=res?.data?.singleProduct;
        setCreate({...create,name,description,price,quantity,shipping,productId:_id,category:category?.name,categoryId:category?._id})
      }  
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getSingleProduct()
  },[])

  //handle Change
  const handleChange=(field,value)=>{
    console.log(value)
      setCreate({
        ...create,
        [field]:value,
      })
  }

  //onSubmit 
  const handleUpdate=async(e)=>{
     e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append('name', name);
    photo && formData.append('photo', photo);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('shipping', shipping);
    formData.append('category', categoryId);
     try {
       const res=await axios.put(`/api/v1/product/update-product/${productId}`,
         formData
     )
     if(res.data.success){
      toast.success(res.data.message)
      navigate("/dashboard/admin/products")  
     }
     else{
      toast.success(res.data.message)
     }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
  }

//delete product
const deleteProduct =async()=>{
  try {
  console.log(productId)
   const askDelete=prompt("Do you want to delete the product?","yes")
   if(askDelete!=="yes") return;
   console.log(productId)
   const res=await axios.delete(`/api/v1/product/delete-product/${productId}`);
   if(res.data.success){
    toast.success(res.data.message)
    //calling all products again
    const data= await getAllProduct();
    dispatch(setProductData(data.allProduct))
    navigate("/dashboard/admin/products")
   }  
  } catch (error) {
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
  getCategory()
  },[])
  return (
    <>
      <Layout>
        <Wrapper className="container-fluid">
          <div className="row">
            <div className="col-md-4  p-3">
              <AdminMenu activeValue="create-product" />
            </div>
            <div className="col-md-8  p-3 p-5">
              
              <div className="category-select col-md-8">
             <Select
             placeholder="Select Categories"
             size="large"
             showSearch
             className="mb-3 select"
             name="category"
             onChange={(value)=>handleChange("categoryId",value)}
             value={categoryId}
             >
               {
                allCategory?.map((val)=>{
                  return(
                  <Option value={val._id} key={val._id}>
                    {val.name}
                  </Option>
                  )
                })
               }
             </Select >
              </div>
              <div className="col-md-8 btn btn-outline-secondary mb-3">
              <label>
               {photo?photo?.name:"Upload Image"}
              <input 
              type="file" 
              accept="image/*"
              name="photo"
               hidden
               onChange={(e)=>handleChange("photo",e.target.files[0])}
               />
              </label>
              </div>
              <div className="col-md-8 mb-3 text-center">
                {
                  photo?
                  <img src={URL.createObjectURL(photo)} alt="not found"
                  className="img-thumbnail"
                  width="50%" 
                  />
                  :
                  <img src={`/api/v1/product/product-image/${productId}`} alt="not found"
                  className="img-thumbnail"
                  width="50%" 
                  />
                }
                
              </div>
              <div className="mb-3 col-md-8">
                <input type="text"
                className="form-control"
                 value={name}
                 onChange={(e)=>handleChange("name",e.target.value)} 
                 placeholder="Name of Product"
                 name="name"
                 />
              </div>
              <div className="mb-3 col-md-8">
                <textarea type="text"
                className="form-control"
                 value={description}
                 onChange={(e)=>handleChange("description",e.target.value)} 
                 placeholder="Description"
                 name="description"
                 ></textarea>
              </div>
              <div className="mb-3 col-md-8">
                <input type="number"
                className="form-control"
                 value={price}
                 onChange={(e)=>handleChange("price",e.target.value)} 
                 placeholder="Product Price"
                 name="price"
                 />
              </div>
              <div className="mb-3 col-md-8">
                <input type="number"
                className="form-control"
                 value={quantity}
                 onChange={(e)=>handleChange("quantity",e.target.value)} 
                 placeholder="Quantity"
                 name="quantity"
                 />
              </div>
              <div className="mb-3 col-md-8">
               <Select
                placeholder="Shipping"
                showSearch
                className="mb-3 select"
                onChange={(value)=>handleChange("shipping",value)}
                name="shipping"
                value={shipping}
               >
               <Option value="1">yes</Option>
               <Option value="0">No</Option>
               </Select>
              </div>
            <div className="mb-3 col-md-8">
            <input type="submit" value="UPDATE" className="btn btn-secondary input"
            onClick={handleUpdate}
            />
             <MyButton onClick={()=>deleteProduct()}>DELETE</MyButton>
            </div>
            </div>
          </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default UpdateProduct;

const Wrapper = styled.div`
.select,.input{
  width:100%;
}
`;
