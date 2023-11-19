import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Product from "../components/Product";
import MyButton from "../components/style/Mybutton";
import { useNavigate } from "react-router-dom";
import PriceConvert from "../helper/PriceConvert";
import { setCartData } from "../reducer/CartSlice";
import Layout from "../components/Layout";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state?.cart?.allCartItem);
  const userData = useSelector((state) => state?.user);
  const [totalPrice, setTotalPrice] = useState();
  const [clientToken, setClientToken] = useState();
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState();
  const navigate = useNavigate();

  //remove item from the cart
  const removeItem = (id) => {
    const newArr = cartItem.filter((val) => val?._id !== id);
    dispatch(setCartData(newArr));
    toast.success("Item is removed from cart successfully!");
  };

  //increase the product qty in cart
  const incrementProduct = (id, selectqty, qty) => {
    if (selectqty < qty) {
      let newArr = [...cartItem];
      const updateIndex = newArr.findIndex((val) => val?._id === id);
      if (updateIndex !== -1) {
        newArr[updateIndex] = {
          ...newArr[updateIndex],
          selectedQty: selectqty + 1,
        };
        dispatch(setCartData(newArr));
      }
    } else {
      toast.error(`Only ${qty} quantatity available!`);
    }
  };

  //decrement the product qty in cart
  const decrementProduct = (id, selectqty) => {
    if (selectqty > 1) {
      let newArr = [...cartItem];
      const updateIndex = newArr.findIndex((val) => val?._id === id);
      if (updateIndex !== -1) {
        newArr[updateIndex] = {
          ...newArr[updateIndex],
          selectedQty: selectqty - 1,
        };
        dispatch(setCartData(newArr));
      }
    } else {
      toast.error(`There must be atleast 1 quantatity!`);
    }
  };

  //calculate total amount
  const calculatePrice = () => {
    const totalPrice = cartItem?.reduce((acc, val) => acc + val?.price*val?.selectedQty, 0);
    setTotalPrice(totalPrice);
  };

  //get Client Token
  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  //make payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance?.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cartItem,
      });
      setLoading(false);
      if (data?.ok) {
        toast.success("Payment Process Completed !");
        localStorage.removeItem("cartItem");
        dispatch(setCartData([]));
        navigate("/dashboard/user/order");
      } else toast.error(data?.result?.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    calculatePrice();
    getClientToken();
  }, []);
  useEffect(() => calculatePrice(), [cartItem]);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {

            cartItem?.length>0
            ?
            <>
             <div className="col-md-8">
            {cartItem?.map((val) => {
              const { _id, selectedQty, quantity } = val;
              return (
                <>
                  <Product val={val} />
                  <button onClick={() => removeItem(_id)}>Remove Item</button>
                  <div>
                    <button
                      onClick={() =>
                        incrementProduct(_id, selectedQty, quantity)
                      }
                    >
                      +
                    </button>
                    <p>{selectedQty}</p>
                    <button onClick={() => decrementProduct(_id, selectedQty)}>
                      -
                    </button>
                  </div>
                </>
              );
            })}
          </div>
          <div className="col-md-4">
            <h1 className="text-center">CART SUMMARY</h1>
            <h3 className="text-center">TOTAL AMOUNT 6522360066406244</h3>
            <h5 className="text-center">
              <PriceConvert price={totalPrice} />
            </h5>
            {userData?.token ? (
              <>
                <h3 className="text-center">CURRENT ADDRESS</h3>
                <h5 className="text-center">{userData?.user?.address}</h5>
                <MyButton
                  className="text-center"
                  onClick={() => navigate("/dashboard/user")}
                >
                  UPDATE ADDRESS
                </MyButton>
                {clientToken? (
                  <div>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button onClick={handlePayment}>
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </div>
                ) : null}
              </>
            ) : (
              <h1 className="text-center">Please Login To checkOut!</h1>
            )}
          </div>
            </>
            :
            <div className="col text-center h-75">
                <h1>No item in the cart!</h1>
            </div>
          }
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
