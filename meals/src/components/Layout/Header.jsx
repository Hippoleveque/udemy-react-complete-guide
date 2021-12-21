import { Fragment } from "react";
import classes from "./Header.module.css";
import img from "../../assets/images/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  const { toggleModalHandler } = props;
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={toggleModalHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img src={img} alt="Meals" />
      </div>
    </Fragment>
  );
};

export default Header;
