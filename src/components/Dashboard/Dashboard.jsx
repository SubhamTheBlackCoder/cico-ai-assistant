import React from "react";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <PageContainer>
      <PageHeader>
        <h1>Dashboard Page</h1>
        <p>Overview & Dashboard</p>
      </PageHeader>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  padding: 40px;
  box-sizing: border-box;

  @media screen and (max-width: 1024px) {
    padding: 30px;
  }

  @media screen and (max-width: 768px) {
    padding: 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 15px;
  }
`;

const PageHeader = styled.div`
  text-align: center;

  h1 {
    color: green;
    font-size: 3rem;
    margin-bottom: 1rem;

    @media screen and (max-width: 1024px) {
      font-size: 2.5rem;
    }

    @media screen and (max-width: 768px) {
      font-size: 2rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 1.8rem;
    }
  }

  p {
    color: #666;
    margin: 0;
    font-size: 1.2rem;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

export default Dashboard;
