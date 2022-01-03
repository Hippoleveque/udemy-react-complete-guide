import { useState } from "react";

const useInput = (validateHandler) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [inputWasTouched, setInputWasTouched] = useState(false);

  const inputIsValid = validateHandler(enteredInput);
  const inputHasErrors = !inputIsValid && inputWasTouched;

  const onInputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const onInputBlurHandler = () => {
    setInputWasTouched(true);
  };

  const onReset = () => {
    setEnteredInput("");
    setInputWasTouched(false);
  };


  return {
      enteredInput, 
      inputIsValid,
      inputHasErrors,
      onInputChangeHandler,
      onInputBlurHandler,
      onReset
  };
};

export default useInput;