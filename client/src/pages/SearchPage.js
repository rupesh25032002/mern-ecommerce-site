import Layout from "../components/Layout";
import React from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
const SearchPage = () => {
  const searchProductDetail = useSelector((state) => state?.search);
  const { searchProduct, loading, keyword } = searchProductDetail;
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : searchProduct?.length > 0 ? (
        <>
         <div className="mt-3 mb-3">
          <h1 className="text-center">Search Products</h1>
          <h4 className="text-center">
            {searchProduct?.length} products found
          </h4>
        </div> 
          <div className="container">
            <div className="row">
              {searchProduct?.map((val) => {
                return (
                  <div className="col-md-4 col-lg-3">
                    <Product val={val} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-5 mb-5 text-center">
            <h1>Sorry , we cant find any product related to {keyword}</h1>
          </div>
        </>
      )}
    </Layout>
  );
};

export default SearchPage;
