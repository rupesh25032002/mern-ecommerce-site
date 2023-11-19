import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import styled from 'styled-components';
import Layout from '../components/Layout'
const About = () => {
  
  return (
    <Layout>
    <Wrapper>
      <div>
    <FloatButton.Group
      shape="circle"
      trigger="hover"
      style={{
        left: 24,
        top:200
      }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton icon={<QuestionCircleOutlined/>} tooltip="Abcdg"/>
      <FloatButton />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
      </div>
     
    </Wrapper>
    </Layout>
  )
}

export default About

const Wrapper=styled.div`
border:5px solid yellow;
height:100vh;
`;