import React from 'react';
import styled from 'styled-components';

const Dashboard = () => {
  return (
    <PageContainer>
      <PageHeader>
        <h1>Upload Page</h1>
        <p>Overview & Dashboard</p>
      </PageHeader>
  
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  margin-top: -40%;

`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    color: green;
    font-size: 427%;
    margin-bottom: 1.5rem;
  }
  
  p {
    color: #666;
    margin: 0;
  }
`;




export default Dashboard;
