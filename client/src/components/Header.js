import { BiShoppingBag } from "react-icons/bi";
import { CgMenu, CgClose } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import MyButton from "./style/Mybutton";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeData } from "../reducer/userSlice";
import React from "react";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const [menuchange, setmenuchange] = useState("close"); //setting open and close css for responsive menubar
  const userData = useSelector((state) => state.user);
  const cartItem=useSelector((state)=>state?.cart?.allCartItem);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //logout function
  const handleLogout = () => {
    localStorage.removeItem("userdata");
    dispatch(removeData());
    navigate("/login");
  };

  //updating menuchange state
  const changemenuicon = (item) => {
    setmenuchange(item);
  };

  return (
    <>
      {/* Navbar */}
      <Nav bg="3px solid yellow">
        {/* Logo Image */}
        <LogoImgBox className="logoimg">
          <LogoImg src="Images/Shopnow.png" alt="logo" />
        </LogoImgBox>

{/* search Box */}
<div className="search-box">
 <SearchBox className="search-input"/>
</div>


        {/* Navbar Items List */}
        <div className="navbar-container">
          <NavItemListBox>
            <NavItemList>
              <NavLink className="navlink" exact={true} to="/">
                Home
              </NavLink>
            </NavItemList>
            <NavItemList>
              <NavLink className="navlink" exact={true} to="/about">
                About
              </NavLink>
            </NavItemList>
            <NavItemList>
              <NavLink className="navlink" exact to="/category">
                Category
              </NavLink>
            </NavItemList>

            {/* Dropdown user or admin dashboard */}

            {
                userData?.token 
                ?
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {userData?.user?.role === 0 ? userData?.user?.name.toUpperCase() : "Admin"}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <NavLink
                  className="dropdown-item bg-white text-black"
                  to={
                    userData?.user?.role === 0
                      ? "/dashboard/user"
                      : "/dashboard/admin"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  className="dropdown-item bg-white text-black"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </div>
            </div>
            :
            null
          }
            {/* Logout Button    Login Button */}
            {!userData.token ? (
              <>
                <NavItemList>
                  <NavLink to="/register">
                    <MyButton>Register</MyButton>
                  </NavLink>
                </NavItemList>
                <NavItemList>
                  <NavLink to="/login">
                    <MyButton>Login</MyButton>
                  </NavLink>
                </NavItemList>
              </>
            ) : (
             null
            )}

            {/* Cart icon */}
            <NavItemList onClick={()=>navigate("/cartitem")}>
              <CartLogo className="cartlogo"  />
              <CartNumber className="cartnumber">{cartItem?.length}</CartNumber>
            </NavItemList>
          </NavItemListBox>

          {/* Open Menu And Close menu icon */}
          <MenuBox className="menubox" bg="yellow">
            <MenuIcon
              className="menuicon"
              onClick={() => changemenuicon("open")}
              myval={menuchange}
            />
            <CloseIcon
              className="closeicon"
              onClick={() => changemenuicon("close")}
              myval={menuchange}
            />
          </MenuBox>
        </div>
      </Nav>

      {/* Responsive navbar for small size Device */}
      <ResNavItemListBox responsive_nav={menuchange}>
        <NavItemList>
          <NavLink className="navlink" exact={true} to="/">
            Home
          </NavLink>
        </NavItemList>
        <NavItemList>
          <NavLink className="navlink" exact={true} to="/about">
            About
          </NavLink>
        </NavItemList>
        <NavItemList>
          <NavLink className="navlink" exact to="/products">
            Product
          </NavLink>
        </NavItemList>

        {/* Dropdown user or admin dashboard */}

        {
                userData?.token 
                ?
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {userData?.user?.role === 0 ? userData?.user?.name.toUpperCase() : "Admin"}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <NavLink
                  className="dropdown-item bg-white text-black"
                  to={
                    userData?.user?.role === 0
                      ? "/dashboard/user"
                      : "/dashboard/admin"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  className="dropdown-item bg-white text-black"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </div>
            </div>
            :
            null
          }
        
         {/* Logout Button    Login Button */}
            {!userData.token ? (
              <>
                <NavItemList>
                  <NavLink to="/register">
                    <MyButton>Register</MyButton>
                  </NavLink>
                </NavItemList>
                <NavItemList>
                  <NavLink to="/login">
                    <MyButton>Login</MyButton>
                  </NavLink>
                </NavItemList>
              </>
            ) : (
             null
            )}

        {/* Cart icon */}
        <NavItemList>
          <CartLogo className="cartlogo"></CartLogo>
          <CartNumber className="cartnumber">10</CartNumber>
        </NavItemList>
      </ResNavItemListBox>
    </>
  );
};

const Nav = styled.nav`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 111;
  background-color: #e9e6e6;
  padding:0px 20px;
  .search-box{
    flex:1;
    padding:0px 116px;
    .search-input{
      font-family: 'Poppins', sans-serif;
    }
  }
  .dropdown-toggle{
    background-color: #d70049;
    border: none;
  }
  .dropdown-item{
    &:hover{
      color:grey;
      font-weight:bold;
    }
  }
  .navbar-container {
    display: flex;

    .userprofile {
      margin-right: 15px;
    }
  }

  @media (max-width: ${({ theme }) => theme.responsive.Extralarge}){

   .search-box{
    padding-left: 50px;
    padding-right:20px;
   }
  }
  @media (max-width: ${({ theme }) => theme.responsive.Large}){

   .search-box{
    padding-left: 25px;
    padding-right:10px;
   }
   .navbar-container{
    font-size:14px;
   }
  }
`;

const LogoImgBox = styled.div`
  overflow: hidden;
  position: relative;
  left: 15px;
`;

const LogoImg = styled.img`
  width: 85px;
`;

const NavItemListBox = styled.ul`
  justify-item: flex-end;
  position: relative;
  right: 15px;
  display: flex;
  margin-bottom: 0px !important;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.responsive.Medium}) {
    display: none;
  }
`;

const NavItemList = styled.li`
  list-style: none;
  display: inline-block;
  padding: 3px 5px 3px 5px;
  margin: 0px 5px 0px 5px;
  .navlink {
    font-size: 1.3em;
    text-decoration: none;
    font-weight: bold;
    color: #0d6efd;
  }
  .active {
    color: #d70049;
  }
  @media (max-width: ${({ theme }) => theme.responsive.Medium}) {
    padding: 10px 0px 10px 0px;
    position: relative;
  }
`;
const CartLogo = styled(BiShoppingBag)`
  font-size: 2em;
  @media (max-width: ${({ theme }) => theme.responsive.Medium}) {
    color: #0d6efd;
  }
`;
const CartNumber = styled.div`
  position: absolute;
  top: 0px;
  font-size: 12px;
  right: 0px;
  border-radius: 50%;
  border: 1px solid;
  padding: 1px 8px;
  background-color: rgb(215, 0, 73);
  color: white;
`;

const MenuBox = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.responsive.Medium}) {
    display: flex;
    position: relative;
    right: 15px;
    padding: 15px;
  }
`;

const MenuIcon = styled(CgMenu)`
  @media (max-width: ${({ theme }) => theme.responsive.Medium}) {
    display: ${(props) => (props.myval === "close" ? "flex" : "none")};
    font-size: 2em;
  }
`;

const CloseIcon = styled(CgClose)`
  @media (max-width: ${({ theme }) => theme.responsive.Medium}) {
    display: ${(props) => (props.myval === "open" ? "flex" : "none")};
    font-size: 2em;
  }
`;

/* Responsive navbar CSS  */
const ResposiveNavbarAnimation = keyframes`
0%{
  transform:translateY(-140%);
}
100%{
  transform:translateY(0);
}
`;

const ResNavItemListBox = styled.ul`
transform:translateY(-140%);
background-color: rgb(0,0,0,0.8);
justify-item: flex-end;
position: relative;
right: 15px;
display: none;
align-items: center;
margin-top:0px;
padding-left:0px;
.dropdown-toggle{
  background-color: #d70049;
  border: none;
  margin-bottom:10px;
}

@media (max-width:${({ theme }) => theme.responsive.Medium}){
    display:flex;
    flex-direction: column;
    width: 100vw;
    position: absolute;
    left:0px;
    z-index: 11;
    animation: ${(props) =>
      props.responsive_nav !== "close"
        ? css`
            ${ResposiveNavbarAnimation} 0.5s ease normal forwards
          `
        : "none"};
`;
export default Navbar;
