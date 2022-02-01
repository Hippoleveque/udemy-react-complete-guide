import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price } = props.item;

  const onIncrementHandler = () => {
    dispatch(cartActions.addItem({ title, price, quantity: 1 }));
  };

  const onDecrementHandler = () => {
    dispatch(cartActions.removeItem(title));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onDecrementHandler}>-</button>
          <button onClick={onIncrementHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
