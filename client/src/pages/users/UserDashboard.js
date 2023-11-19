import React from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import UserMenu from "../../components/UserMenu";
import UserProfile from "../../components/UserProfile";
const UserDashboard = () => {
  return (
    <>
      <Layout>
        <Wrapper className="container-fluid">
          <div className="row">
            <div className="col-md-4  p-3">
              <UserMenu activeValue="user-profile" />
            </div>
            <div className="col-md-8  p-3 p-5">
              <UserProfile/>
            </div>
          </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default UserDashboard;

const Wrapper = styled.div``;
