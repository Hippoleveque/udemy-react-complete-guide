import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { AuthContext } from "../../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "EMAIL_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }

  if (action.type === "EMAIL_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }

  if (action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatcher] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, passwordDispatcher] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  const { onLogin } = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(
      () => setFormIsValid(emailIsValid && passwordIsValid),
      500
    );

    return () => clearTimeout(identifier);
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    emailDispatcher({ type: "EMAIL_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passwordDispatcher({ type: "PASSWORD_INPUT", value: event.target.value });
  };

  const emailValidateHandler = (event) => {
    emailDispatcher({ type: "EMAIL_BLUR" });
  };

  const passwordValidateHandler = (event) => {
    passwordDispatcher({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={emailState.isValid}
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={emailValidateHandler}
          label="E-Mail"
        >
        </Input>
        <Input
          isValid={passwordState.isValid}
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={passwordValidateHandler}
          label="Password"
        >
        </Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
