import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Layout from './Layout'
import axios from 'axios'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify'
import MyButton from './style/Mybutton'
import { setCartData } from '../reducer/CartSlice'
import { BiMinus, BiPlus } from 'react-icons/bi'
import ReactStars from "react-rating-stars-component";
import PriceConvert from '../helper/PriceConvert'
const SingleProduct = () => {
  const params=useParams();
  const [itemAdded,setItemAdded]=useState();
  const [create,setCreate]=useState({
    category:"",
    name:"",
    description:"",
    price:"",
    rating:0,
    quantity:"",
    shipping:"",
    productId:"",
    categoryId:"",
  })
  const [currentProduct,setCurrentProduct]=useState();
  const [productCount,setProductCount]=useState(1)
  const {category,name,description,price,quantity,shipping,productId,categoryId,rating}=create;
  const dispatch=useDispatch();
  const cartItem=useSelector((state)=>state?.cart?.allCartItem);
  const location = useLocation();

  //get single product
  const getSingleProduct=async()=>{
    try {
      const res=await axios.get(`/api/v1/product/getsingle-product/${params.slug}`);
      console.log(res?.data)
      if(res?.data?.success){
        const {_id,name,description,price,quantity,shipping,category,rating}=res?.data?.singleProduct;
        console.log("Rating",rating)
        setCurrentProduct({...res?.data?.singleProduct,selectedQty:productCount})
        setCreate({...create,name,description,price,rating,quantity,shipping,productId:_id,category:category?.name,categoryId:category?._id})
      }  
    } catch (error) {
      console.log(error)
    }
  }


//increment product
const incrementProduct=()=>{
  if(productCount<quantity)
  setProductCount(productCount+1)
  else
  toast.error(`Only ${productCount} item is available in Stock!`)
}
//decrement product
const decrementProduct=()=>{
  if(productCount>1)
  setProductCount(productCount-1)
  else
  toast.error(`There must be atleast 1 quantatity!`)
}


//add to cart item
const addToCart=()=>{
  if(itemAdded!==-1){
    toast.success("Item is already added to the cart!");
  }
  else{
    dispatch(setCartData([...cartItem,{...currentProduct,selectedQty:productCount}]))
    setItemAdded(true)
    toast.success("Item added to the cart");
    console.log(cartItem)
  }
}

  useEffect(()=>{
    getSingleProduct()
    const isFound=cartItem?.findIndex((val)=>val?._id===currentProduct?._id)
    setItemAdded(isFound)
  },[params])

  useEffect(()=>{
     console.log("singlepage")
  },[])
  return (
  <Wrapper>
    <div className='img-container'>
      <img src={`/api/v1/product/product-image/${productId}`} alt="Not Found" />
    </div>
    <div className='info-container'>
      <div>
        <p>{category}</p>
      </div>
      <div className='product-name'>
        <p>{name}</p>
      </div>
      <div>
      <p><PriceConvert price={price}/></p>
      </div>
      <div>
        {console.log(rating)}
      <ReactStars
        count={5}
        value={location?.state?.ratingVal}
        size={30}
        edit={false}
        activeColor="#ffd700"
        isHalf={true}
      />
      </div>
      <div className='product-description'>
        <p>{description}</p>
      </div>
      <div className='product-stock'>
        {
          quantity>0?
          <p style={{color:"green"}}>Available in Stock</p>
          :
          <p style={{color:"red"}}>Not Available in Stock</p>
        }
      </div>
      <div className='addtocart'>
        <BiPlus className="icon" onClick={incrementProduct}/>
        <button>{productCount}</button>
        <BiMinus className="icon" onClick={decrementProduct}/>
      </div>
      <div className='addtocartbtn'>
        <button onClick={addToCart}>Add To Cart</button>
      </div>
    </div>
  </Wrapper>
  )
}

export default SingleProduct

const Wrapper=styled.div`
p{
  margin:0px;
}
width:80vw;
display:flex;
margin:auto;
margin-top:2vmax;
margin-bottom: 2vmax;
padding-bottom: 2vmax;
border-bottom:2px solid #9d9191;
.img-container{
  flex:1;
  display:flex;
  justify-content: center;
  align-items:center;
  img{
    width:20vmax;
  }
}
.info-container{
 flex:1;

 >div{
  margin:1vmax 0;
 }
 >div > p{
  font-size:1.3vmax;
  font-weight:bold;
 }
 .product-name p{
  font-size:1.5vmax;
  font-weight:bold;
 }
 .product-description p{
  font-size:1vmax;
  font-weight:500;
 }
 .product-stock p{
  font-weight:bold;
  color:green;
 }
 .addtocart{
  margin: 1.5vmax 0;
  .icon{
    font-size:1.5vmax;
    font-weight:bold;
  }
  button{
    padding:0.2vmax 1vmax;
    margin:0 1vmax;
    background-color:transparent;
    font-size:1.2vmax;
    border:none;
  }
 }
 .addtocartbtn{
  button{
    padding:0.8vmax 1vmax;
    background-color:rgb(215, 0, 73);
    border:none;
    font-size:1.1vmax;
    color:white;
  }
 }
}

@media (max-width:600px){
  flex-direction:column;
 .info-container{
 .product-name p{
  font-size:2vmax;
 }
 .product-description p{
  font-size:1.6vmax;
 }
 >div > p{
  font-size:1.8vmax;
 }
 .addtocart{
  .icon{
    font-size:2vmax;
  }
  button{
    font-size:1.8vmax
  }
 }
 .addtocartbtn{
   button{
     padding:0.8vmax 1vmax;
     font-size:1.5vmax;
   }
  }
}
}
`;