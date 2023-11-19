import axios from 'axios'
import React from 'react'
import { styled } from 'styled-components'
import { useEffect } from 'react'
import { setUserOrderData } from '../reducer/OrderSlice'
import { useSelector,useDispatch } from 'react-redux'
import moment from "moment"
const UserOrderDetail = () => {
  const dispatch=useDispatch();
  const orderData=useSelector((state)=>state?.userOrder?.userOrderDetail);
  
  //get user order detail
  const getUserOrderDetail=async()=>{
    try {
      const {data}=await axios.get("/api/v1/order/user-order");
      if(data?.success){
         dispatch(setUserOrderData(data?.order))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUserOrderDetail()
  },[])
  return (
    <Wrapper>
      <h1 className='text-center mb-3'>ORDER DETAIL</h1>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Status</th>
      <th scope="col">Buyer</th>
      <th scope="col">Date</th>
      <th scope="col">Payment</th>
      <th scope="col">Quantity</th>
    </tr>
  </thead>
  <tbody>
    {
        orderData?.map((val,i)=>{
          return(
            <>
     <tr>
          <th scope="row">{i+1}</th>
          <td>{val?.status}</td>
          <td>{val?.buyer?.name}</td>
          <td>{moment(val?.createdAt).fromNow()}</td>
          <td>{val?.payment?.success?"Success":"Failed"}</td>
          <td>{val?.products?.length}</td>
    </tr>
            </>
          )
        })
    }
  </tbody>
</table>
  </Wrapper>
  )
}

const Wrapper=styled.div`

`;
export default UserOrderDetail
