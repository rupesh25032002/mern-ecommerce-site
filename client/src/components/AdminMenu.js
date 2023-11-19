import React from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { styled } from 'styled-components'
import { useState } from 'react'
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { BsArrowDownCircle } from 'react-icons/bs';
import {RxDashboard} from "react-icons/rx";
import { MdOutlineProductionQuantityLimits,MdCategory } from 'react-icons/md';
import { CgProductHunt } from 'react-icons/cg';
import { TbTruckDelivery } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
const AdminMenu = () => {
  const navigate=useNavigate();
  return (
   <>
   <Wrapper>
 <FloatButton.Group
      type="primary"
      shape="circle"
      trigger="hover"
      style={{
        left: 24,
        top:100,
      }}
      icon={<BsArrowDownCircle className='icon'/>}
    >
      <FloatButton  
      icon={<RxDashboard/>} 
      tooltip="Dashboard"
      onClick={()=>navigate("/dashboard/admin")}
      />
      
      <FloatButton  
      icon={<MdCategory/>} 
      tooltip="Create Category"
      onClick={()=>navigate("/dashboard/admin/create-category")}
      />

      <FloatButton  
      icon={<MdOutlineProductionQuantityLimits/>} 
      tooltip="Create Product"
      onClick={()=>navigate("/dashboard/admin/create-product")}
      />

      <FloatButton  
      icon={<CgProductHunt/>} 
      tooltip="All Products"
      onClick={()=>navigate("/dashboard/admin/products")}
      />

      <FloatButton.BackTop visibilityHeight={0} 
      icon={<TbTruckDelivery/>} 
      tooltip="Order"
      visi
      onClick={()=>navigate("/dashboard/admin/orders")}
      />
    </FloatButton.Group>
</Wrapper>
   </>
  )
}
export default AdminMenu

const Wrapper=styled.div`
display:inline;
`;