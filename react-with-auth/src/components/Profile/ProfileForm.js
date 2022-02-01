import { useContext, useRef } from "react";
import { AuthContext } from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./ProfileForm.module.css";

const API_KEY = "AIzaSyCSYhVXvHxc5Ov58qsLrEVrGjlEayPBJKc";
const CHANGE_PASSWORD_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

const ProfileForm = () => {
  const { loginToken, logoutHandler } = useContext(AuthContext);
  const newPasswordRef = useRef();
  const history = useHistory();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    fetch(CHANGE_PASSWORD_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        idToken: loginToken,
        password: newPasswordRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          logoutHandler();
          return response.json();
        } else {
          throw new Error("Reset password failed");
        }
      })
      .then((data) => history.push("/auth"))
      .catch((err) => console.log(err));
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
