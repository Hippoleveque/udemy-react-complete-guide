import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalOpened: false,
  };

  closeModalHandler = () => {
    this.setState({ modalOpened: false });
  };

  openModalHandler = () => {
    this.setState({ modalOpened: true });
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <Modal show={this.state.modalOpened} closed={this.closeModalHandler} />
        <Backdrop show={this.state.modalOpened} />
        <button className="Button" onClick={this.openModalHandler}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
