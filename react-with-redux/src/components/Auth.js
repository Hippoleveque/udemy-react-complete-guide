import classes from "./Auth.module.css";
import { useRef } from "react";
import { authActions } from "../store/index";
import { useDispatch } from "react-redux";

const Auth = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (
      emailRef.current.value.trim().length > 0 &&
      passwordRef.current.value.trim().length > 0 &&
      emailRef.current.value.includes("@")
    ) {
      dispatch(authActions.login());
      emailRef.current.value = "";
      passwordRef.current.value = "";
    } else {
      return;
    }
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordRef} />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
