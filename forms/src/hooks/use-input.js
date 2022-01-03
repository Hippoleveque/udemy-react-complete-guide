import { useState } from "react";

const useInput = (inputValidationHandler) => {
    const [enteredInput, setEnteredInput] = useState("");
    const [inputWasTouched, setInputWasTouched] = useState(false);

    const enteredInputIsValid = inputValidationHandler(enteredInput);
    const inputIsInvalid = !enteredInputIsValid && inputWasTouched;

    const onChangeInputHandler = (event) => {
        setEnteredInput(event.target.value);
    }

    const onBlurInputHandler = (event) => {
        setInputWasTouched(true);
    }

    const onCleanInputHandler = () => {
        setEnteredInput("");
        setInputWasTouched(false);
    }

    const inputClasses = !enteredInputIsValid
    ? "form-control"
    : "form-control invalid";

    return {
        enteredInput,
        enteredInputIsValid,
        inputIsInvalid,
        onChangeInputHandler,
        onBlurInputHandler,
        onCleanInputHandler,
        inputClasses
    }

};


export default useInput;