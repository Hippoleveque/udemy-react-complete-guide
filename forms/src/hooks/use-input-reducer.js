import { useReducer } from "react";

const inputReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    return {
      enteredInput: action.value,
      inputWasTouched: state.inputWasTouched,
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      enteredInput: state.enteredInput,
      inputWasTouched: true,
    };
  }

  if (action.type === "INPUT_CLEAN") {
    return {
      enteredInput: "",
      inputWasTouched: false,
    };
  }
};

const useInputReducer = (inputValidationHandler) => {
  const [inputState, inputDispatcher] = useReducer(inputReducer, {
    enteredInput: "",
    inputWasTouched: false,
  });

  const { enteredInput, inputWasTouched } = inputState;

  const enteredInputIsValid = inputValidationHandler(enteredInput);
  const inputIsInvalid = !enteredInputIsValid && inputWasTouched;

  const onChangeInputHandler = (event) => {
    inputDispatcher({ type: "INPUT_CHANGE", value: event.target.value });
  };

  const onBlurInputHandler = (event) => {
    inputDispatcher({ type: "INPUT_BLUR" });
  };

  const onCleanInputHandler = () => {
    inputDispatcher({ type: "INPUT_CLEAR" });
  };

  const inputClasses = !inputIsInvalid
    ? "form-control"
    : "form-control invalid";

  return {
    enteredInput,
    enteredInputIsValid,
    inputIsInvalid,
    onChangeInputHandler,
    onBlurInputHandler,
    onCleanInputHandler,
    inputClasses,
  };
};

export default useInputReducer;
