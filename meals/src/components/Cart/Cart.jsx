import { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem/CartItem";

const Cart = (props) => {
  const { toggleModalHandler } = props;
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const addItemHandler = (item) => {
    cartContext.addItem(item);
  };

  const removeItemHandler = (id) => {
    cartContext.removeItem(id);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          amount={item.amount}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal toggleModalHandler={toggleModalHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={toggleModalHandler} className={classes["button--alt"]}>
          Close
        </button>
        <button onClick={toggleModalHandler} className={classes.order}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
