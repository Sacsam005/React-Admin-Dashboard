import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import jwt_decode from "jwt-decode";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./Login.sass";

const Login = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState("");
  const [selectedRandomAdmin, setSelectedRandomAdmin] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(
      e.target.value.charAt(0).toUpperCase() + e.target.value.substring(1)
    );
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
  };

  const handleLogin = () => {
    if (!profilePic) {
      alert("Please upload a profile pic and try again.");
    } else if (userName === "" || password === "") {
      alert("Enter username and password!");
    } else if (
      (userName !== "" &&
        userName.trim().toLowerCase() !== selectedRandomAdmin) ||
      (password !== "" && password.trim().toLowerCase() !== randomPassword)
    ) {
      alert("Wrong credentials. Please try again.");
    } else {
      localStorage.setItem("userName", userName);
      localStorage.setItem("profilePic", profilePic);
      // Event dispatching logic moved inside handleLogin to prevent bad setState so that event will only be dispatched when necessary, and not during the rendering process.
      const profileUpdatedEvent = new CustomEvent("profileUpdated", {
        detail: { userName, profilePic },
      });
      window.dispatchEvent(profileUpdatedEvent);
      navigate("/home");
    }
  };

  function handleCallbackResponse(response) {
    const user = jwt_decode(response.credential);
    const googleUserName = user.given_name;
    const googleProfilePic = user.picture;

    setUserName(googleUserName);
    setProfilePic(googleProfilePic);
    localStorage.setItem("userName", googleUserName);
    localStorage.setItem("profilePic", googleProfilePic);

    const googleProfileUpdatedEvent = new CustomEvent("googleProfileUpdated", {
      detail: { googleUserName, googleProfilePic },
    });
    window.dispatchEvent(googleProfileUpdatedEvent);
    navigate("/home");
  }

  const randomPassword = "admin005";
  useEffect(() => {
    const randomAdmins = ["sam005", "sachin005", "max005"];
    const randomIndex = Math.floor(Math.random() * randomAdmins.length);
    setSelectedRandomAdmin(randomAdmins[randomIndex]);
    document.title = "Login | Admin Dashboard";

    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <motion.div
        className="login_container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="login_page">
          <h5>Login to Admin Dashboard</h5>
          <div className="profile_pic_container">
            <label
              htmlFor="profilePic"
              className="d-flex align-items-start upload_pic_label"
              style={{ borderBottom: "1px solid #20B2AA" }}
            >
              Upload Profile pic{" "}
              <DriveFolderUploadOutlinedIcon className="icon mx-1" />
            </label>
            <input
              type="file"
              id="profilePic"
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
            />
            {profilePic && <img src={profilePic} alt="Avatar" />}
          </div>
          <div className="username_container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={handleUserNameChange}
              placeholder={`${
                selectedRandomAdmin
                  ? selectedRandomAdmin.charAt(0).toUpperCase() +
                    selectedRandomAdmin.substring(1)
                  : ""
              }`}
            />
          </div>
          <div className="password_container">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={handlePassword}
              placeholder={`${
                randomPassword
                  ? randomPassword.charAt(0).toUpperCase() +
                    randomPassword.substring(1)
                  : ""
              }`}
              required
            />
          </div>
          <button onClick={handleLogin} style={{ fontWeight: 600 }}>
            Login
          </button>

          <h6 className="d-flex align-items-center justify-content-center my-2">
            Or
          </h6>

          <div
            id="signInDiv"
            className="d-flex align-items-center justify-content-center my-2"
            onClick={handleCallbackResponse}
          ></div>

          <div className="signin_note mt-2">
            <p>
              Please use the provided placeholder values (case-insensitive) as
              username and password in the designated fields to access the
              dashboard.
              <span> A profile picture is required to sign in. Thank you.</span>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
