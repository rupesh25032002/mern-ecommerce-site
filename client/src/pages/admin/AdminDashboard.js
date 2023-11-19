import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import styled from "styled-components";
const AdminDashboard = () => {
  return (
    <>
      <Layout>
        <Wrapper className="container-fluid">
          <div className="row">
            <div className="col-md-4  p-3">
              <AdminMenu activeValue="admin-profile" />
            </div>
            <div className="col-md-8  p-3 p-5">
              <h1>Admin Detail</h1>
            </div>
          </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default AdminDashboard;

const Wrapper = styled.div``;
