import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import getAllProduct from '../../helper/AllProduct'
import AdminMenu from '../../components/AdminMenu';
import { styled } from 'styled-components';
import Layout from '../../components/Layout';
import Product from '../../components/Product';
import { useDispatch,useSelector } from 'react-redux';
import { setProductData } from '../../reducer/ProductSlice';
const ProductsList = () => {
const dispatch=useDispatch();
const allProduct=useSelector((state)=>state?.product?.allProduct)
console.log(allProduct)
  const getAllProductFunction=async()=>{
    try {
      const data=await getAllProduct();
      if(data.message){
        dispatch(setProductData(data?.allProduct))
      }
      else{
        toast.error(data?.message)
      } 
    } catch (error) {
       toast.error(error?.response?.data?.message)
    }
  }

  useEffect(()=>{
    getAllProductFunction()
  },[])

  return (
    <Layout>
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col-md-4  p-3">
          <AdminMenu activeValue="products" />
        </div>
        <div className="col-md-8  p-3 p-5">
        <div className='row'>
          {
            allProduct?.map((val)=>{
              return(
                <div className="col-md-6  p-3 p-5">
                   <Product val={val}/>
                </div>
              )
            })
          }
        </div>
        </div>
      </div>
    </Wrapper>
  </Layout>

  )
}
export default ProductsList


const Wrapper=styled.div`

`;