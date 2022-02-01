import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const API_KEY = "AIzaSyCSYhVXvHxc5Ov58qsLrEVrGjlEayPBJKc";

const SIGNUP_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGNIN_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const AuthForm = () => {
  const history = useHistory();
  const passwordRef = useRef();
  const emailRef = useRef();
  const { loginHandler } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let url;
    if (isLogin) {
      url = SIGNIN_ENDPOINT;
    } else {
      url = SIGNUP_ENDPOINT;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error("Authentication failed");
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
        loginHandler(data.idToken, expirationTime.toISOString());
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
