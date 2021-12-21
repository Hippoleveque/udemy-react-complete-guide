import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const elementToPortal = document.getElementById("overlay");

const Modal = (props) => {
  const { toggleModalHandler } = props;

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={toggleModalHandler} />,
        elementToPortal
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClick={toggleModalHandler}>
          {props.children}
        </ModalOverlay>,
        elementToPortal
      )}
    </Fragment>
  );
};

export default Modal;
