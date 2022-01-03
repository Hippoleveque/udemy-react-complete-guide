import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const nameValidationHandler = (enteredName) => {
    return enteredName.trim().length !== 0;
  };

  const emailValidationHandler = (enteredEmail) => {
    return enteredEmail.trim().length !== 0 && enteredEmail.includes("@");
  };

  const {
    enteredInput: enteredName,
    enteredInputIsValid: enteredNameIsValid,
    inputIsInvalid: nameInputIsInvalid,
    onChangeInputHandler: onChangeNameHandler,
    onBlurInputHandler: onBlurNameHandler,
    onCleanInputHandler: onCleanNameHandler,
    inputClasses: nameInputClasses
  } = useInput(nameValidationHandler);

  const {
    enteredInput: enteredEmail,
    enteredInputIsValid: enteredEmailIsValid,
    inputIsInvalid: emailInputIsInvalid,
    onChangeInputHandler: onChangeEmailHandler,
    onBlurInputHandler: onBlurEmailHandler,
    onCleanInputHandler: onCleanEmailHandler,
    inputClasses: emailInputClasses
  } = useInput(emailValidationHandler);


  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onCleanNameHandler();
    onCleanEmailHandler();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={onChangeNameHandler}
          onBlur={onBlurNameHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text"> Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">Your Email</label>
        <input
          type="text"
          id="email"
          onChange={onChangeEmailHandler}
          onBlur={onBlurEmailHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className="error-text"> Email must be valid.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
