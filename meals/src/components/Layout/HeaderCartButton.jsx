import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";

const HeaderCartButton = (props) => {
  return (
    <button className={classes.button}>
      <span>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span>3</span>
    </button>
  );
};

export default HeaderCartButton;
