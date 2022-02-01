import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const AuthContext = React.createContext({
  loginToken: null,
});

const calculateExpirationTime = (expirationDate) => {
  const now = new Date().getTime();
  const adjExpirationTime = new Date(expirationDate).getTime();
  const remainingTime = adjExpirationTime - now;
  return remainingTime;
};

const retrieveTokenData = () => {
  const initialToken = localStorage.getItem("loginToken");
  const initialExpirationDate = localStorage.getItem("loginExpirationDate");
  const remainingTime = calculateExpirationTime(initialExpirationDate);
  console.log("retrieveTokenData called");
  if (remainingTime <= 3600 * 1000) {
    return null;
  }

  return {
    token: initialToken,
    remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveTokenData();
  let initialToken;
  if (tokenData) {
    initialToken(tokenData.token);
  }
  const [loginToken, setLoginToken] = useState(initialToken);

  const logoutHandler = useCallback(() => {
    setLoginToken(null);
    localStorage.removeItem("loginToken");
    localStorage.removeItem("loginExpirationDate");
    clearTimeout(logoutTimer);
  }, []);

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [tokenData, logoutHandler]);

  const loginHandler = (token, expirationDate) => {
    setLoginToken(token);
    const remainingTime = calculateExpirationTime(expirationDate);
    localStorage.setItem("loginToken", token);
    localStorage.setItem("loginExpirationDate", expirationDate);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  return (
    <AuthContext.Provider
      value={{
        loginToken,
        loginHandler,
        logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
