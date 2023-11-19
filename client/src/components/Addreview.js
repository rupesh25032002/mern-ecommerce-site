import React, { useState } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { MdCancel } from "react-icons/md";
import { setProductData, setProductReview } from "../reducer/ProductSlice";
import { toast } from "react-toastify";
import getAllProduct from "../helper/AllProduct";
import axios from "axios";
import { useParams } from "react-router-dom";
const Addreview = ({ closeReview }) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const products = useSelector((state) => state?.product?.allProducts);
  const [review, setReview] = useState({
    name: user?.name,
    rating: 0,
    comment: "",
  });
  const { name, rating, comment } = review;

  //rating value handling
  const handleRating = (ratingVal) => {
    setReview({ ...review, rating: ratingVal });
  };
  
  //comemnt handling
  const setComment = (comment) => {
    setReview({ ...review, comment });
  };

  //update the review
  const updateReview = async () => {
    try {
      const { data } = await axios.patch(
        `/api/v1/product/update-review/${slug}`,
        review
      );
      if (data?.success) {
        getAllReview();
        toast.success(data?.message);
        closeReview(false);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
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
  return (
    <Wrapper>
      <div>
        <div className="username">
          <p>{user?.name}</p>
          <MdCancel className="icon" onClick={() => closeReview(false)} />
        </div>
        <div className="rating">
          <ReactStars
            count={5}
            value={rating}
            size={30}
            activeColor="#ffd700"
            onChange={handleRating}
          />
        </div>
        <div className="comment">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
          />
        </div>
        <div className="submit-btn">
          <button onClick={updateReview}>Submit</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Addreview;

const Wrapper = styled.div`
  p {
    margin: 0;
  }
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1111;
  background-color: #f3f3f3;
  > div {
    width: 60%;
    border: 2px solid #dddddd;
    padding: 1.5vmax;
    box-shadow: 2px 2px 13px #100f0f;
    background-color: white;
  }

  .username {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 2vmax;
      font-weight: bold;
    }
    .icon {
      font-size: 1.5vmax;
    }
  }

  .rating {
    margin-bottom: 1vmax;
  }
  .comment {
    border: 2px solid #dddddd;
    padding: 0.5vmax;
    margin-bottom: 1.5vmax;
    input {
      width: 100%;
      border: none;
      font-size: 1.1vmax;
    }
  }
  .submit-btn button {
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

  @media (max-width:600px){
    > div {
    width: 90%;
  }
  .username .icon {
      font-size: 2vmax;
    }
    .comment input {
      font-size: 1.5vmax;
    }
    .submit-btn button {
    font-size: 1.4vmax;  
  }
  }
`;
