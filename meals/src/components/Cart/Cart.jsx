import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout";

const ORDERS_ENDPOINT =
  "https://react-http-78834-default-rtdb.europe-west1.firebasedatabase.app/orders.json";

const Cart = (props) => {
  const { toggleModalHandler } = props;

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const addItemHandler = (item) => {
    cartContext.addItem(item);
  };

  const removeItemHandler = (id) => {
    cartContext.removeItem(id);
  };

  const onOrderClickHandler = () => {
    setIsCheckingOut(true);
  };

  const submitCartHandler = async (userData) => {
    await fetch(ORDERS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartContext.items,
      }),
    });
    cartContext.clearCart();
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

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={toggleModalHandler} className={classes["button--alt"]}>
        Close
      </button>
      <button onClick={onOrderClickHandler} className={classes.order}>
        Order
      </button>
    </div>
  );

  return (
    <Modal toggleModalHandler={toggleModalHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onSubmit={submitCartHandler} onCancel={toggleModalHandler} />
      )}
      {!isCheckingOut && modalActions}
    </Modal>
  );
};

export default Cart;
