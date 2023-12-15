import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageNotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Page Not Found";
  });
  return (
    <>
      <ErrorDiv className="error_div">
        <h1>404</h1>
        <h6>Page not found</h6>
        <button
          className="btn btn-primary rounded-0 mt-2"
          onClick={() => navigate("/home")}
        >
          Go back to home
        </button>
      </ErrorDiv>
    </>
  );
};

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  h1 {
    font-size: 8rem;
    font-weight: 700;
    margin: 0;
    color: #dc3545;
  }
  h6 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
    color: #6c757d;
  }
`;

export default PageNotFound;
