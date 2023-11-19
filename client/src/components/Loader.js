import styled from "styled-components"
import { Space, Spin } from 'antd';
const Loader=()=>{
  return(
    <Wrapper>
     <Space size="middle">
    <Spin size="large" />
    </Space>
    </Wrapper>
  )
}
export default Loader

const Wrapper=styled.div`
height:100vh;
width:100vw;
display: flex;
justify-content:center;
align-items:center;
`;