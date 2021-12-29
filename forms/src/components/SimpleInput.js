import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameWasTouched, setEnteredNameWasTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailWasTouched, setEnteredEmailWasTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim().length !== 0;
  const enteredEmailIsValid = enteredEmail.trim().length !== 0 && enteredEmail.includes("@");
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameWasTouched;
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailWasTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const onChangeInputHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const onChangeEmailHandler = (event) => {
    setEnteredEmail(event.target.value)
  }

  const onBlurEmailHandler = (event) => {
    setEnteredEmailWasTouched(true);
  }

  const onBlurHandler = (event) => {
    setEnteredNameWasTouched(true);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setEnteredNameWasTouched(true);
    setEnteredEmailWasTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameWasTouched(false);
    setEnteredEmailWasTouched(false);
  };

  let nameInputClasses = !nameInputIsInvalid
    ? "form-control"
    : "form-control invalid";

  let emailInputClasses = !emailInputIsInvalid
    ? "form-control"
    : "form-control invalid";

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={onChangeInputHandler}
          onBlur={onBlurHandler}
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
