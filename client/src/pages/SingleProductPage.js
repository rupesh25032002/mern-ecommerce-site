import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import SingleProduct from "../components/SingleProduct";
import SimilarProduct from "../components/SimilarProduct";
import Reviews from "../components/Reviews";
import styled from "styled-components";
import Addreview from "../components/Addreview";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { setProductReview } from "../reducer/ProductSlice";

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const [reviewBox, setReviewBox] = useState(false);
  const allReview = useSelector((state) => state?.product?.allReview);
  const allProduct = useSelector((state) => state?.product?.allProduct);
  const { slug } = useParams();

  //close review popup
  const closeReview = (data) => {
    setReviewBox(data);
  };

  //Get all review
  const getAllReview = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-review/${slug}`);
      if (data?.success) {
        dispatch(setProductReview(data?.reviews[0]?.reviews));
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllReview();
    console.log('singleproductpage')
  }, []);
  useEffect(() => {
    getAllReview();
  }, [reviewBox]);
  return (
    <Layout>
      <Wrapper>
        <SingleProduct />
        <SimilarProduct />
        <div className="review-container">
          <div className="review-header">
            <h1>Reviews <span>({allReview?.length} review found)</span></h1>
            <button onClick={() => setReviewBox(true)}>Give Review</button>
          </div>
          {allReview?.length > 0 ? (
            allReview?.map((val) => {
              return <Reviews val={val} />;
            })
          ) : (
            <div className="no-review">
              <h1>No Reviews </h1>
            </div>
          )}
        </div>
      </Wrapper>
      {reviewBox && <Addreview closeReview={() => closeReview(false)} />}
    </Layout>
  );
};

export default SingleProductPage;

const Wrapper = styled.div`
  position: relative;
  .review-container {
    width: 80vw;
    margin: auto;
    margin-top: 2vmax;
    margin-bottom: 2vmax;
    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2vmax;
      h1 {
        font-size: 2.5vmax;
        font-weight: bolder;
        margin-bottom: 1vmax;
        span{
          font-size:1vmax;
        }
      }
      button {
        padding: 0.8vmax 1vmax;
        background-color: rgb(215, 0, 73);
        border: none;
        font-size: 1.1vmax;
        color: white;
        border-radius: 3px;

        &:hover {
          font-weight: bold;
        }
      }
    }
  }

  .no-review {
    width: 100%;
    h1 {
      font-size: 2vmax;
      margin: auto;
      font-weight: bolder;
      margin-top: 2xmax;
      margin-bottom: 2vmax;
    }
  }

  @media (max-width:600px){
    .review-container .review-header {
      h1 {
        font-size: 2.3vmax;
        span{
          font-size:1.3vmax;
        }
      }
      button {
        font-size: 1.5vmax;
      }
    }
  }
`;
