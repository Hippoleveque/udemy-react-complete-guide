import classes from "./ErrorModal.module.css";
import Card from "./Card";
import Button from "./Button";

const ErrorModal = (props) => {
  return (
    <div>
      <div onClick={props.onClose} className={classes.backdrop} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onClose}>Okay</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
