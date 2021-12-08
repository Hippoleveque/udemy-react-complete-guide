import { useState } from "react";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart"
import Card from "../UI/Card";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const onFilterDateChange = (year) => {
    setFilteredYear(year);
  };

  const expensesToRender = props.expenses.filter(
    (expense) => expense.date.getFullYear().toString() === filteredYear
  );

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onFilterDateChange={onFilterDateChange}
      />
      <ExpensesChart expenses={expensesToRender} />
      <ExpensesList expenses={expensesToRender} />
    </Card>
  );
};

export default Expenses;
