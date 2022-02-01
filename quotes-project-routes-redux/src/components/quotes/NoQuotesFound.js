import classes from "./NoQuotesFound.module.css";
import { NavLink } from "react-router-dom";

const NoQuotesFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No quotes found!</p>
      <NavLink to="/new-quote" className="btn">
        Add a Quote
      </NavLink>
    </div>
  );
};

export default NoQuotesFound;
