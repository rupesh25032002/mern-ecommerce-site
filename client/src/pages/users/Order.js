import React from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import UserMenu from "../../components/UserMenu";
import UserProfile from "../../components/UserProfile";
import UserOrderDetail from "../../components/UserOrderDetail";
const Order = () => {
  return (
    <>
      <Layout>
        <Wrapper className="container-fluid">
          <div className="row">
            <div className="col-md-4  p-3">
              <UserMenu activeValue="order" />
            </div>
            <div className="col-md-8  p-3 p-5">
              <UserOrderDetail/>
            </div>
          </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default Order;

const Wrapper = styled.div``;
