import React, { useContext } from "react";
import { TodosContext } from "../store/todos-context";
import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";

const Todos: React.FC = (props) => {
  const { items, onRemoveTodo } = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {items.map((el) => (
        <TodoItem
          key={el.id}
          todo={el}
          onRemoveTodo={onRemoveTodo.bind(null, el.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
