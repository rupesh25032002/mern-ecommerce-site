import React from "react";
import { styled } from "styled-components";
import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Radio } from "antd";
import getAllCategory from "../helper/AllCategory";
import { setCategoryData } from "../reducer/CategorySlice";
import { setProductData,setFilterProductData } from "../reducer/ProductSlice";
import { priceList } from "../helper/priceList";
import { toast } from "react-toastify";
import Product from "../components/Product";
import MyButton from "../components/style/Mybutton";
import {MdKeyboardArrowDown} from "react-icons/md";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.user?.token);
  const allCategory = useSelector((state) => state?.category?.allCategory);
  console.log(allCategory)
  const allProduct = useSelector((state) => state?.product?.allProduct);
  const allFilterProduct=useSelector((state)=>state?.product?.allFilterProduct)

  const [filterItem, setFilterItem] = useState({
    categoryFilter: [],
    priceFilter: [],
  });

  const { categoryFilter, priceFilter } = filterItem;
  const [totalProduct, setTotalProduct] = useState();
  const [productPage, setProductPage] = useState(1);
  const [loading,setLoading]=useState(false)
  const [pageLoading,setPageLoading]=useState(false)
  console.log(loading)
  //function to get all categories
  const getCategory = async () => {
    try {
      const data = await getAllCategory();
      if (data?.success) {
        dispatch(setCategoryData(data?.allCategory));
      }
      console.log("category",data?.allCategory)
    } catch (error) {
      console.log(error);
    }
  };

  //set filters
  const setFilter = (field, value, id) => {
    //if categoryFilter
    if (field === "categoryFilter") {
      if (value) {
        setFilterItem({
          ...filterItem,
          categoryFilter: [...categoryFilter, id],
        });
      } else {
        const newval = categoryFilter?.filter((val) => val !== id);
        setFilterItem({ ...filterItem, categoryFilter: newval });
      }
    }
    //if priceFilter
    if (field === "priceFilter") {
      setFilterItem({ ...filterItem, priceFilter: [...value] });
    }
  };

  //get total product count
  const getProductCount = async () => {
    try {
      const res = await axios.get(
        `/api/v1/product/getproduct-count`
      );
      if (res?.data?.success) setTotalProduct(res?.data?.totalProduct);
    } catch (error) {
      console.log(error);
    }
  };

  //get products on the base of page
  const getProducts = async () => {
    try {
      setLoading(true)
      setPageLoading(true)
      const res = await axios.get(
        `/api/v1/product/getall-product/${productPage}`
      );
      setLoading(false)
      setPageLoading(false)
      if (res?.data?.success) {
        dispatch(setProductData(res?.data?.products));
      }
    } catch (error) {
      setLoading(false)
      setPageLoading(false)
      console.log(error);
    }
  };

  //load more products
  const handleProducts = async () => {
    setProductPage(productPage + 1);
    try {
      setLoading(true)
      const res = await axios.get(
        `/api/v1/product/getall-product/${productPage}`
      );
      setLoading(false)
      if (res?.data?.success) {
        const moreProducts = [...allProduct, ...res?.data?.products];
        dispatch(setProductData(moreProducts));
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  //set filter products
  const getFilterProduct=async()=>{
    try {
      const res= await axios.post("/api/v1/product/get-filterproduct",{...filterItem});
      if (res?.data?.success){
        if (allProduct?.length > 0){
          dispatch(setProductData([]))
          setProductPage(1)
        } 
        dispatch(setFilterProductData(res?.data?.filterProducts));
      }
      else{
       getProducts()
       dispatch(setFilterProductData([]))
      } 
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(()=>{
  getFilterProduct() 
  },[filterItem])

  useEffect(() => {
    getCategory();
    getProductCount();
    getProducts();
  }, []);

  return (
    <Layout>{
      pageLoading
      ?<Loader/>
      :
      <Wrapper className="productpage">
          <div className="filter-container">
            {
              window.innerWidth>600 ?
              <h1 className="filters-head">FILTERS</h1>
              :null
            }
            <div className="all-filters">
            <div className="category-container">
              <h3>CATEGORY</h3>
              <div>
                {allCategory?.map((val) => {
                  return (
                    <Checkbox
                      key={val._id}
                      onChange={(e) => {
                        setFilter("categoryFilter", e.target.checked, val._id);
                      }}
                    >
                      {val.name}
                    </Checkbox>
                  );
                })}
              </div>
            </div>
            <div className="price-container">
              <h3>PRICE</h3>
              <div>
                <Radio.Group
                  onChange={(e) => setFilter("priceFilter", e.target.value)}
                  >
                  {priceList?.map((val) => {
                    return (
                      <Radio key={val.id} value={val.arr}>
                        {val.name}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </div>
            </div>
            <div className="filter-btn" onClick={()=>window.location.reload()}>
        <button>CLEAR FILTER</button>
      </div>
          </div>
          </div>
          <div className="product-container">
            <h1 className="all-products">PRODUCTS</h1>
            <div className="product-block">
              {
              categoryFilter?.length < 1 && priceFilter?.length < 1 
              ?
              allProduct?.map((val) => {
                return (
                    <Product val={val} /> 
                );
              })
              : allFilterProduct.length > 0
              ?
              allFilterProduct?.map((val) => {
                return (
                    <Product val={val} />
                );
              })
              :
              <h1 className="mb-3 text-center">Sorry! No Product Found</h1>
            }
            </div>
            {allProduct?.length < totalProduct && allProduct?.length > 0 && 
              <div className="load-more" onClick={handleProducts}>
              <button>{loading?`Loading...`:`Load More`}</button>
            </div>}
          </div>
      </Wrapper>
}
 
    </Layout>
  );
};

export default Home;

const Wrapper=styled.div`
width:100vw;
display:flex;
.filter-container{
  flex:1;
}

.all-filters{
  padding-left:1vmax;
}
.all-filters > div{
  margin-bottom:1.5vmax;
}

.all-filters > div > h3{
  font-size: 1.3vmax;
  font-weight: bold;
  margin-bottom: 0.7vmax;
}
.category-container > div,
.price-container > div > div {
  display:flex;
  flex-direction:column;
}
.category-container > div > label,
.price-container > div > div > label{
  font-size:1.1vmax;
}
.product-container{
  flex:3;
}
.all-products,.filters-head{
  font-size: 2.5vmax;
    width: 33vmax;
    margin-bottom: 2vmax;
    text-align:center;
    margin:auto;
    padding: 1vmax;
    margin-bottom: 2vmax;
    color: rgb(215,0,73);
    font-weight:bolder;
}

.filters-head{
  width:16vmax;
}

.filter-btn{
  width:60%;
  margin:auto;
    button{
      width:100%;
      padding:0.5vmax;
      font-size:1.1vmax;
      font-weight:bold;
      color:white;
      background-color:rgb(215, 0, 73);
      border:0;
      border-radius: 2px;
      pointer:cursor;
    }
  }

.product-block{
  display: flex;
  justify-content:space-around;
  flex-wrap: wrap;
  max-height:100vh;
  overflow-x:auto;
}
.product-box{
  width:350px;
  margin-bottom:15px;
}
.searchinput{
  width:50%;
}

.ant-btn {
  background-color: rgb(215, 0, 73);
}
.ant-btn:focus {
  background-color: rgb(215, 0, 73) !important;
  box-shadow: none !important;
}

.load-more{
  width:40%;
  margin:auto;
    button{
      width:100%;
      padding:0.5vmax;
      font-size:1.1vmax;
      font-weight:bold;
      background-color:transparent;
      color:black;
      border:2px solid rgb(215, 0, 73);
      border-radius: 2px;
      pointer:cursor;
      margin-bottom:2vmax;
      margin-top:2vmax;
      &:hover{
      color:rgb(215, 0, 73);
      border:2px solid black;
      } 
      .arrow-down{
        font-size:1.1vmax;
      }
    }
}


@media (max-width:600px){
  flex-direction: column-reverse;
  .product-block{
    overflow:visible;
    max-height:fit-content;
  }
  .all-products{
    font-size:4.5vmax;
  }
  .load-more{ 
    width:80%;
    button{
    font-size: 2.1vmax;
  }
}
.product-block{
  padding: 5vmax 2vmax;
}
.filter-container{
  padding: 5vmax 2vmax;
  border-top: 2px solid #c7c1c1;
}
.all-filters > div > h3{
  font-size: 2vmax;
}
.category-container > div,
.price-container > div > div {
  flex-direction:row;
  flex-wrap:wrap;
}
.category-container > div > label,
.price-container > div > div > label{
  font-size: 1.8vmax;
  margin: 1vmax;
}
.filter-btn{
    button{  
      font-size:1.8vmax; 
    }
  }
}
`;