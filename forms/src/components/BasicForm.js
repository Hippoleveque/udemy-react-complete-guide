import useInputReducer from "../hooks/use-input-reducer";

const BasicForm = (props) => {
  const {
    enteredInput: enteredFirstName,
    enteredInputIsValid: firstNameIsValid,
    inputIsInvalid: firstNameHasError,
    onChangeInputHandler: onChangeFirstNameHandler,
    onBlurInputHandler: onBlurFirstNameHandler,
    onCleanInputHandler: onCleanFirstNameHandler,
    inputClasses: firstNameClasses,
  } = useInputReducer((value) => value.trim().length > 0);

  const {
    enteredInput: enteredLastName,
    enteredInputIsValid: lastNameIsValid,
    inputIsInvalid: lastNameHasError,
    onChangeInputHandler: onChangeLastNameHandler,
    onBlurInputHandler: onBlurLastNameHandler,
    onCleanInputHandler: onCleanLastNameHandler,
    inputClasses: lastNameClasses,
  } = useInputReducer((value) => value.trim().length > 0);

  const {
    enteredInput: enteredEmail,
    enteredInputIsValid: emailIsValid,
    inputIsInvalid: emailHasError,
    onChangeInputHandler: onChangeEmailHandler,
    onBlurInputHandler: onBlurEmailHandler,
    onCleanInputHandler: onCleanEmailHandler,
    inputClasses: emailClasses,
  } = useInputReducer((value) => value.trim().length > 0 && value.includes("@"));

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onCleanEmailHandler();
    onCleanFirstNameHandler();
    onCleanLastNameHandler();
  };

  let formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={enteredFirstName}
            onChange={onChangeFirstNameHandler}
            onBlur={onBlurFirstNameHandler}
          />
          {firstNameHasError && (
            <p className="error-text"> First name must not be empty </p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={enteredLastName}
            onChange={onChangeLastNameHandler}
            onBlur={onBlurLastNameHandler}
          />
          {lastNameHasError && (
            <p className="error-text"> Last name must not be empty </p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={onChangeEmailHandler}
          onBlur={onBlurEmailHandler}
        />
        {emailHasError && <p className="error-text"> Email must be valid </p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
