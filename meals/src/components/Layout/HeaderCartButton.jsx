import { useContext, useState, useEffect } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";
import CartContext from "../store/cart-context";

const HeaderCartButton = (props) => {
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);
  const { onClick } = props;

  const { items } = useContext(CartContext);

  const numberOfItems = items.reduce(
    (rollingQty, newItem) => rollingQty + newItem.amount,
    0
  );
  const buttonClasses = `${classes.button} ${
    isBtnHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBtnHighlighted(true);
    const timer = setTimeout(() => {
      setIsBtnHighlighted(false);
    }, 300);

    return () => {clearTimeout(timer)}
  }, [items]);

  return (
    <button className={buttonClasses} onClick={onClick}>
      <span>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems} </span>
    </button>
  );
};

export default HeaderCartButton;
