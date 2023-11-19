import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import { styled } from 'styled-components'
import Layout from '../../components/Layout'
import AdminOrderDetail from '../../components/AdminOrderDetail'
const AdminOrder = () => {
  return (
    <Layout>
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col-md-4  p-3">
          <AdminMenu activeValue="admin-order" />
        </div>
        <div className="col-md-8  p-3 p-5">
        <AdminOrderDetail/>
        </div>
      </div>
    </Wrapper>
  </Layout>

  )
}

export default AdminOrder

const Wrapper=styled.div`

`;