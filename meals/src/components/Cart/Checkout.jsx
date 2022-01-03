import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const validateInput = (value) => {
  return value.trim().length > 0;
};

const Checkout = (props) => {
  const {
    enteredInput: enteredName,
    inputIsValid: nameIsValid,
    inputHasErrors: nameHasErrors,
    onInputChangeHandler: onNameChangeHandler,
    onInputBlurHandler: onNameBlurHandler,
    onReset: onNameReset
  } = useInput(validateInput);

  const {
    enteredInput: enteredStreet,
    inputIsValid: streetIsValid,
    inputHasErrors: streetHasErrors,
    onInputChangeHandler: onStreetChangeHandler,
    onInputBlurHandler: onStreetBlurHandler,
    onReset: onStreetReset
  } = useInput(validateInput);

  const {
    enteredInput: enteredPostal,
    inputIsValid: postalIsValid,
    inputHasErrors: postalHasErrors,
    onInputChangeHandler: onPostalChangeHandler,
    onInputBlurHandler: onPostalBlurHandler,
    onReset: onPostalReset
  } = useInput(validateInput);

  const {
    enteredInput: enteredCity,
    inputIsValid: cityIsValid,
    inputHasErrors: cityHasErrors,
    onInputChangeHandler: onCityChangeHandler,
    onInputBlurHandler: onCityBlurHandler,
    onReset: onCityReset
  } = useInput(validateInput);

  const formIsValid =
    nameIsValid && cityIsValid && postalIsValid && streetIsValid;

  const nameClasses = `${classes.control} ${nameHasErrors ? classes.invalid : ''}`
  const streetClasses = `${classes.control} ${streetHasErrors ? classes.invalid : ''}`
  const postalClasses = `${classes.control} ${postalHasErrors ? classes.invalid : ''}`
  const cityClasses = `${classes.control} ${cityHasErrors ? classes.invalid : ''}`

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onSubmit({
        name: enteredName,
        city: enteredCity,
        postalCode: enteredPostal,
        street: enteredStreet,
    })
    onNameReset();
    onStreetReset();
    onPostalReset();
    onCityReset();
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          value={enteredName}
          onChange={onNameChangeHandler}
          onBlur={onNameBlurHandler}
        />
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Your Street</label>
        <input
          id="street"
          type="text"
          value={enteredStreet}
          onChange={onStreetChangeHandler}
          onBlur={onStreetBlurHandler}
        />
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Your Postal Code</label>
        <input
          id="postal"
          type="text"
          value={enteredPostal}
          onChange={onPostalChangeHandler}
          onBlur={onPostalBlurHandler}
        />
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">Your City</label>
        <input
          id="city"
          type="text"
          value={enteredCity}
          onChange={onCityChangeHandler}
          onBlur={onCityBlurHandler}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
