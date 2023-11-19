import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import axios from 'axios'
import {useSelector,useDispatch} from "react-redux"
import Product from './Product'
import { setSimilarProductData } from '../reducer/ProductSlice'
const SimilarProduct = () => {
  const params=useParams();
  const dispatch=useDispatch()
  const allSimilarProduct=useSelector((state)=>state?.product?.allSimilarProduct)
  console.log(allSimilarProduct)
  console.log(params)
  const getSimilarProduct=async()=>{
    try {
      const res=await axios.get(`/api/v1/product/similar-product/${params.slug}`);
      if(res?.data?.success){
        dispatch(setSimilarProductData(res?.data?.similarProduct))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getSimilarProduct();
  },[])
  return (
    <Wrapper>
      <h1>Similar Product</h1>
    <div>
      {
        allSimilarProduct?.map((val)=>{
          return(
              <Product val={val}/>
          )
        })
      }
    </div>
    </Wrapper>
  )
}

export default SimilarProduct
const Wrapper=styled.div`
width:80vw;
margin:auto;
margin-top:2vmax;
margin-bottom:3vmax;
padding-bottom:2vmax;
border-bottom: 2px solid #9d9191;
h1{
  font-size:2.5vmax;
  font-weight:bolder;
  margin-bottom:1vmax;
}

>div{
  display:flex;
  justify-content:space-around;
  flex-wrap: wrap;
}
`;
