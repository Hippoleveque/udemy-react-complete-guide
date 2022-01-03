import classes from "./Header.module.css";
import { authActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          <li>
            <a href="/">My Products</a>
          </li>
          <li>
            <a href="/">My Sales</a>
          </li>
          {isAuthenticated && <li>
            <button onClick={onLogout}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
