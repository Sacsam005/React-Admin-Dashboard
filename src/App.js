import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import Products from "./Pages/Products/Products";
import AddUsers from "./Pages/Users/AddUsers";
import AddProducts from "./Pages/Products/AddProducts";
import Orders from "./Pages/Orders/Orders";
import Logout from "./Pages/Logout/Logout";
import Sales from "./Pages/Orders/Sales";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import "./App.sass";

// Context for the theme settings and the functions to handle them
export const LoaderContext = React.createContext();
export const ThemeContext = React.createContext();
export const ProfileContext = React.createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [blueColorMode, setBlueColorMode] = useState(false);
  const appRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  function handleDarkMode() {
    setDarkMode(true);
    setBlueColorMode(blueColorMode);
    appRef.current.classList.toggle("dark_mode");
    appRef.current.classList.remove("blue_color_mode");
    localStorage.setItem("selectedTheme", "dark");
  }

  function handleBlueColorMode() {
    setBlueColorMode(true);
    setDarkMode(darkMode);
    appRef.current.classList.toggle("blue_color_mode");
    appRef.current.classList.remove("dark_mode");
    localStorage.setItem("selectedTheme", "blue");
  }

  function handleDefaultMode() {
    setDarkMode(false);
    setBlueColorMode(false);
    appRef.current.classList.remove("dark_mode");
    appRef.current.classList.remove("blue_color_mode");
    localStorage.setItem("selectedTheme", "light");
  }

  useEffect(() => {
    // Retrieve the values from local storage and set them to component state
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName ? storedUserName : "Sachin005");

    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    } else {
      setProfilePic("https://sachinsamal005.netlify.app/img/sachin-samal.png");
    }

    // Retrieve the selected theme from local storage and set
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") {
      setDarkMode(true);
      setBlueColorMode(false);
      appRef.current.classList.add("dark_mode");
      appRef.current.classList.remove("blue_color_mode");
    } else if (selectedTheme === "blue") {
      setDarkMode(false);
      setBlueColorMode(true);
      appRef.current.classList.remove("dark_mode");
      appRef.current.classList.add("blue_color_mode");
    } else {
      setDarkMode(false);
      setBlueColorMode(false);
      appRef.current.classList.remove("dark_mode");
      appRef.current.classList.remove("blue_color_mode");
    }

    setIsLoading(false);
    window.scrollTo(0, 0);

    // Add an event listener to update the local storage values when the profile is updated
    const handleProfileUpdated = (event) => {
      localStorage.setItem("userName", event.detail.userName);
      localStorage.setItem("profilePic", event.detail.profilePic);
      setUserName(event.detail.userName);
      setProfilePic(event.detail.profilePic);
    };
    window.addEventListener("profileUpdated", handleProfileUpdated);

    // Add an event listener to update the local storage values when the google profile is updated
    const handleGoolgeProfileUpdated = (event) => {
      localStorage.setItem("userName", event.detail.googleUserName);
      localStorage.setItem("profilePic", event.detail.googleProfilePic);
      setUserName(event.detail.googleUserName);
      setProfilePic(event.detail.googleProfilePic);
    };
    window.addEventListener("googleProfileUpdated", handleGoolgeProfileUpdated);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdated);
      window.removeEventListener(
        "googleProfileUpdated",
        handleGoolgeProfileUpdated
      );
    };
  }, []);

  // Context values to pass to the children components
  const ThemeContextValues = {
    darkMode,
    blueColorMode,
    handleDarkMode,
    handleBlueColorMode,
    handleDefaultMode,
  };

  const LoaderContextValues = {
    isLoading,
    setIsLoading,
  };

  const ProfileContextValues = {
    userName,
    profilePic,
    setUserName,
    setProfilePic,
  };

  return (
    <>
      <div className="app" ref={appRef}>
        <ThemeContext.Provider value={ThemeContextValues}>
          <LoaderContext.Provider value={LoaderContextValues}>
            <ProfileContext.Provider value={ProfileContextValues}>
              <BrowserRouter>
                <Routes>
                  <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/orders">
                      <Route index element={<Orders />} />
                      <Route path="/orders/sales" element={<Sales />} />
                    </Route>
                    <Route path="/users">
                      <Route index element={<Users />} />
                      <Route path="/users/new" element={<AddUsers />} />
                    </Route>
                    <Route path="/products">
                      <Route index element={<Products />} />
                      <Route path="/products/new" element={<AddProducts />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ProfileContext.Provider>
          </LoaderContext.Provider>
        </ThemeContext.Provider>
      </div>
    </>
  );
}

export default App;
