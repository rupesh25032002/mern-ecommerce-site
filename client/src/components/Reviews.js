import React from 'react'
import ReactStars from 'react-rating-stars-component'
import styled from "styled-components"
const Reviews = ({val}) => {
  const {name,rating,comment}=val;
  return (
   <Wrapper>
    <div className='username'>
    <p>{name}</p>
    </div>
    <div className='rating'>
    <ReactStars
        count={5}
        value={rating}
        size={30}
        edit={false}
        activeColor="#ffd700"
        isHalf={true}

/>
    </div>
    <div className='comment'>
    <p>{comment}</p>
    </div>
   </Wrapper>
  )
}

export default Reviews

const Wrapper=styled.div`
p{
  margin: 0;
}
width:80vw;
padding: 1vmax;
border: 1px solid #e7dada;
border-radius: 4px;
box-shadow: 1px 1px 5px #b3a3a3;
margin-bottom:1.5vmax;
.username{
  font-size:1.5vmax;
  font-weight:bolder;
}
.rating{
  margin-bottom:1.5vmax;
  border-bottom:2px solid grey;
}
.comment{
  font-size:1.2vmax;
  max-height:10vmax;
  overflow-y: auto;
}

@media (max-width:600px){
  .username{
  font-size:2vmax;
}
.comment{
  font-size:1.5vmax;
}
}
`;