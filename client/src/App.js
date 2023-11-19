import logo from './logo.svg';
import './App.css';
import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Products from "./pages/Category"
import ErrorPage from './pages/ErrorPage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Forgetpassword from './pages/auth/Forgetpassword';
import UserDashboard from './pages/users/UserDashboard';
import { useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import {setData} from "./reducer/userSlice";
import ProtectedRoute from './route/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRoute from './route/UserRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './route/AdminRoute';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import axios from 'axios';
import ProductsList from './pages/admin/ProductsList';
import UpdateProduct from './pages/admin/UpdateProduct';
import SearchPage from './pages/SearchPage';
import SingleProductPage from './pages/SingleProductPage';
import Cart from './pages/Cart';
import { setCartData } from './reducer/CartSlice';
import Order from './pages/users/Order';
import AdminOrder from './pages/admin/AdminOrder';
import Category from './pages/Category';
function App() {
  const dispatch=useDispatch();
  const data=useSelector((state)=>state?.user);

  //setting default header
  axios.defaults.headers.common["Authorization"]=data?.token;

  //autologin 
  const autoLogin=()=>{
     const user=JSON.parse(localStorage.getItem("userdata"));
     if(user){
       dispatch(setData(user))
     }
  }

  //initially set cart item from localstorage to state
  const setCartItem=()=>{
    const cartItem=JSON.parse(localStorage.getItem("cartItem"));
    console.log(cartItem)
    if(cartItem){
      dispatch(setCartData(cartItem))
    }
  }

  useEffect(()=>{  
    autoLogin()
    setCartItem()
  },[])
  return (
    <>
    <Routes>
    <Route exact path="/" Component={Home} />
    <Route exact path="/about" Component={About} />
    <Route exact path="/category" Component={Category} />
    <Route exact path="/contact" Component={Contact} />
    <Route exact path="/cartItem" Component={Cart} />
    <Route exact path="/searchproduct" Component={SearchPage} />
    <Route exact path="/product/:slug" Component={SingleProductPage} />
    <Route exact path="*" Component={ErrorPage} />
    <Route Component={ProtectedRoute}>
    <Route exact path="/login" Component={Login} />
    <Route exact path="/Register" Component={Register} />
    <Route exact path="/forgetpassword" Component={Forgetpassword}/>
    </Route>
    {/* USER DASHBOARD */}
    <Route exact path="/dashboard" Component={UserRoute}>
    <Route exact path="user" Component={UserDashboard}/>
    <Route exact path="user/order" Component={Order}/>
    </Route>
    {/* ADMIN DASHBOARD */}
    <Route exact path="/dashboard" Component={AdminRoute}>
    <Route exact path="admin" Component={AdminDashboard}/>
    <Route exact path="admin/create-category" Component={CreateCategory}/>
    <Route exact path="admin/create-product" Component={CreateProduct}/>
    <Route exact path="admin/update-product/:slug" Component={UpdateProduct}/>
    <Route exact path="admin/products" Component={ProductsList}/>
    <Route exact path="admin/orders" Component={AdminOrder}/>
    </Route>
    </Routes>
    <ToastContainer/>
  </>
  );
}


export default App;
