import React, { useContext, useRef } from "react";
import { TodosContext } from "../store/todos-context";
import classes from "./NewTodo.module.css";

const NewTodo: React.FC = (props) => {
  const formInputRef = useRef<HTMLInputElement>(null);
  const { onAddTodo } = useContext(TodosContext);

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = formInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    onAddTodo(enteredText);
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <label htmlFor="text">Todo For</label>
      <input type="text" id="text" ref={formInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
