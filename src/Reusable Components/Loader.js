import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <>
      <StyledLoader>
        <p>Loading...</p>
      </StyledLoader>
    </>
  );
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  &:before {
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid #ccc;
    border-top-color: #13a8ff;
    animation: ${spin} 0.8s ease-in-out infinite;
  }

  p {
    margin-top: 6rem;
    font-weight: 700;
  }
`;

export const smalleLoader = () => {
  return <p>Loading...</p>;
};

export default Loader;
