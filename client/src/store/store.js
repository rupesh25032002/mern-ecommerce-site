import { configureStore } from "@reduxjs/toolkit";
import userData from "../reducer/userSlice"
import categoryData from "../reducer/CategorySlice";
import productData from "../reducer/ProductSlice"
import searchProduct from "../reducer/SearchSlice";
import cartData from "../reducer/CartSlice"
import userOrder from "../reducer/OrderSlice";

const store=configureStore({
  reducer:{
    user:userData,
    category:categoryData,
    product:productData,
    search:searchProduct,
    cart:cartData,
    userOrder:userOrder
  }
})

export default store