import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

const ExpenseItem = (props) => {
  return (
    <li>
      <Card className="expense-item">
        <div className="expense-item__description">
          <ExpenseDate date={props.date} />
          <h2>{props.title}</h2>
          <div className="expense-item__price">{props.amount} €</div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
