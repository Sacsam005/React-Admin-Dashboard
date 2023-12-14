import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userName");
    localStorage.removeItem("profilePic");
    navigate("/logout");
    document.title = "Logout | Admin Dashboard";
  }, [navigate]);

  useEffect(() => {
    const handleBackButton = () => {
      navigate("/login");
    };
    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [navigate]);

  return (
    <>
      <LogoutContainer className="logout_container">
        <div className="logout_div d-flex align-items-center justify-content-center flex-column">
          <p className="mb-0" style={{ color: "red", fontWeight: "700" }}>
            You have successfully logged out.
          </p>
          <button
            className="btn btn-primary rounded-0 mt-2"
            onClick={() => navigate("/")}
          >
            Go back to Login
          </button>
        </div>
      </LogoutContainer>
    </>
  );
};

const LogoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;

  .login_page {
    margin-top: 0.75rem;
  }
`;

export default Logout;
