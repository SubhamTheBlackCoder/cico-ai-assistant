import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <PageContainer>
      <Title>Welcome to Consysmind</Title>
   
      <StyledLink to="/auth">Login</StyledLink>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 6vw, 3rem);
  color: #28a745;
  margin-bottom: 0.5rem;
`;

const StyledLink = styled(Link)`
  padding: 0.6rem 1.2rem;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

export default Home;
