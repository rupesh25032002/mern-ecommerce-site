import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyButton from "./style/Mybutton";
import { setCartData } from "../reducer/CartSlice";
import PriceConvert from "../helper/PriceConvert";
import ReactStars from "react-rating-stars-component";
const Product = ({val}) => {
 
 const {_id,category,name,price,slug,rating}=val;
 const navigate = useNavigate()
 const role=useSelector((state)=>state?.user?.user?.role)
 const location=useLocation();
 const dispatch=useDispatch();
 const cartItem=useSelector((state)=>state?.cart?.allCartItem);
 

 //navigate to dashboard (for admin)
 const handleEdit=()=>{
  if(role===1) navigate(`/dashboard/admin/update-product/${slug}`)
  else navigate(location.pathname)
 }

 //rating chnaged

  return (
    <Wrapper>
      <div className="img-container">
      <img src={`/api/v1/product/product-image/${_id}`} alt="Not Found"/>
      </div>
      <div className="rating-container">
      <ReactStars
        count={5}
        value={rating}
        size={30}
        edit={false}
        activeColor="#ffd700"
        isHalf={true}
      />
      </div>
      <p>{_id}</p>
      <div className="product-info">
        <p>{name}</p>
        <p><PriceConvert price={price}/></p>
      </div>
      <div className="product-more" onClick={()=>navigate(`/product/${slug}`,{state:{ratingVal:rating}})}>
        <button>More Detail</button>
      </div>
    </Wrapper>
  )
}

export default Product;

const Wrapper=styled.div`
width:18vmax;
margin: 1vmax 2vmax;
transition:all 0.5s;
&:hover{
  transform:translateY(-10%);
}
.img-container{
  width: 18vmax;
  img{
    width:100%;
    object-fit:cover;
  }
}
.product-info,.rating-container{
  margin: 1vmax 0.5vmax;
}
  .product-info > p{
    margin:0px !important;
    font-size:1.3vmax;
    font-weight:bold;
  }
  .product-info > p:first-child{
    font-size:1.5vmax;
  }
  .product-more{
    button{
      width:100%;
      padding:0.7vmax;
      font-size:1.2vmax;
      font-weight:bold;
      color:white;
      background-color:rgb(215, 0, 73);
      border:0;
      border-radius: 3px;
      pointer:cursor;
    }
  }
  @media (max-width:600px){
  width:36vmax;
  margin:2vmax;
  .img-container{
    width:36vmax;
  }
  .product-info > p:first-child{
    font-size:2.5vmax;
  }
  .product-info > p:last-child{
    font-size:2.3vmax;
  }
  .product-more > button{
    font-size:2.2vmax;
  }
}
`;