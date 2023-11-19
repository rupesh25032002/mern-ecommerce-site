import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { useState } from "react";
const UserMenu = ({ activeValue }) => {
  const [active, setActive] = useState(activeValue);
  console.log(active);
  const handleActiveClass = (val) => {
    setActive(val);
  };
  return (
    <>
      <Wrapper className="adminpanel d-flex flex-column justify-content-center align-items-center">
        <h1>USER PANEL</h1>
        <ul className="list-group border border-dark">
          <li
            className={
              active == "user-profile"
                ? "list-group-item activelist"
                : "list-group-item"
            }
            onClick={() => handleActiveClass("user-profile")}
          >
            <NavLink className="navlink" to="/dashboard/user">
              User Profile
            </NavLink>
          </li>
          <li
            className={
              active == "order"
                ? "list-group-item activelist"
                : "list-group-item"
            }
            onClick={() => handleActiveClass("order")}
          >
            <NavLink className="navlink" to="/dashboard/user/order">
              Order
            </NavLink>
          </li>
        </ul>
      </Wrapper>
    </>
  );
};
export default UserMenu;

const Wrapper = styled.div`
  .list-group {
    width: 100%;
  }
  .list-group-item {
    border: 1px solid;
    text-align: center;
  }
  .navlink {
    text-decoration: none;
    font-weight: bold;
    color: black;
    font-size: 1.2em;
    width: 100%;
    display: block;
  }

  .activelist {
    color: white;
    background-color: rgb(215, 0, 73);
    border: 1px solid rgb(215, 0, 73);
  }

  .activelist a {
    color: white;
  }

  @media (max-width: ${({ theme }) => theme.responsive.Small}) {
    .list-group {
      width: 100%;
    }
  }
`;
