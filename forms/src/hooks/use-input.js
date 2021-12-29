import { useState } from "react";

const useInput = (inputValidationHandler) => {
    const [enteredInput, setEnteredInput] = useState("");
    const [inputWasTouched, setInputWasTouched] = useState(false);

    const enteredInputIsValid = inputValidationHandler(enteredInput, inputWasTouched);

    const onChangeInputHandler = (event) => {
        setEnteredInput(event.target.value);
    }

    const onBlurInputHandler = (event) => {
        setInputWasTouched(true);
    }

    const onCleanInput = () => {
        setEnteredInput("");
        setInputWasTouched(false);
    }

    const inputClasses = !enteredInputIsValid
    ? "form-control"
    : "form-control invalid";

    return {
        enteredInput,
        enteredInputIsValid,
        onChangeInputHandler,
        onBlurInputHandler,
        onCleanInput
    }

};


export default useInput;