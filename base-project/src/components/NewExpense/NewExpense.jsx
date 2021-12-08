import { useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  const [formStatus, setFormStatus] = useState(false);

  const changeFormStatusHandler = () => {
    setFormStatus((status) => !status);
  };

  return (
    <div className="new-expense">
      {formStatus ? (
        <ExpenseForm
          changeStatusHandler={changeFormStatusHandler}
          addExpenseHandler={props.addExpenseHandler}
        />
      ) : (
        <button onClick={changeFormStatusHandler}> Add Expense </button>
      )}
    </div>
  );
};

export default NewExpense;
