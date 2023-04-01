import React, { useState, createContext } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const LoginContext = createContext();

const LoginProvider = (props) => {
  const [login, setLoginState] = useState(false);
  const [logout, setLogoutState] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({ capabilities: [] });

  const userLogin = async (username, password) => {
    let url = process.env.REACT_APP_API;

    const axiosRequest = {
      url: `${url}/signin`,
      method: "post",
      auth: {
        username,
        password,
      },
    };
    let response = await axios(axiosRequest);
    const { token } = response.data;
    setToken(token);

    if (token) {
      try {
        validateToken(token);
      } catch (e) {
        setLoginState(false);
        setLogoutState(true);
        setToken(null);
        setLoggedIn(false);
        setUser({});
      }
    } else {
      setLogoutState(true);
      setToken(null);
      setLoggedIn(false);
      setUser({ message: "Invalid User" });
    }
  };

  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      setLoginState(true);
      setLogoutState(false);
      setToken(token);
      setUser(validUser);
      setLoggedIn(true);
    } catch (e) {
      setLoginState(false);
      setLogoutState(true);
      setToken(null);
      setUser({});
      setLoggedIn(false);
    }
  };

  // const changeLoginState = (loggedIn, token, user, error) => {
  //   setLoginState(true);
  //   setLoggedIn(true);
  //   setLogoutState(false);
  //   setToken(token);
  //   setUser(user);
  // };

  const userLogout = () => {
    setLoginState(false);
    setLoggedIn(false);
    setLogoutState(true);
    setToken(null);
    setUser({});
  };

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  // const componentDidMount = () => {
  //   const token = localStorage.getItem("auth");
  //   validateToken(token);
  // };

  let exportedSettings = {
    userLogin,
    loggedIn,
    userLogout,
    can,
  };

  return (
    <LoginContext.Provider value={exportedSettings}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
