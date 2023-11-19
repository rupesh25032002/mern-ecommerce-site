import React from 'react';
import styled from 'styled-components';

const ProductCardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
`;

const ProductName = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  color: #e74c3c;
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const AddToCartButton = styled(Button)`
  background-color: #3498db;
  color: #fff;
`;

const MoreDetailsButton = styled(Button)`
  background-color: #2ecc71;
  color: #fff;
`;

const Category = () => {
  return (
    <>
    <div className='container-fluid'>
      <div className='row'>
    <div className='col-md-4'></div>
    <div className='col-md-8'>
      <div className='row'>
        {
         [1,2,3,4,6,7].map((val)=>{
          return(
            <div className='col-md-4'>
    <ProductCardContainer>
      <ProductImage src="Images/Home.jpg" alt="Product Image" />
      <ProductName>Product Name</ProductName>
      <ProductPrice>$99.99</ProductPrice>
      <ButtonContainer>
        <MoreDetailsButton>More Details</MoreDetailsButton>
      </ButtonContainer>
    </ProductCardContainer>
            </div>
          )
         })
        }
      </div>
   
    </div>
      </div>
    </div>
    </>
  );
};

export default Category;
