import { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (name.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter valid age and username.",
      });
      return;
    }
    if (+age < 0) {
      setError({
        title: "Invalid input",
        message: "Please enter positive age.",
      });
      return;
    }
    props.addUserHandler({ age: age, name: name, key: name + age });
    setName("");
    setAge("");
  };

  const onChangeNameHandler = (event) => {
    setName(event.target.value);
  };

  const onChangeAgeHandler = (event) => {
    setAge(event.target.value);
  };

  const closeModalHandler = (event) => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={closeModalHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="name">Add User</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={onChangeNameHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={onChangeAgeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
