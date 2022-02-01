import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { loginToken, logoutHandler } = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!loginToken && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {loginToken && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {loginToken && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
