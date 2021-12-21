import {  useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/store/cart-context-provider";

function App() {
  const [activeCart, setActiveCart] = useState(false);

  const toggleModalHandler = () => {
    setActiveCart((prevActive) => !prevActive);
  };

  return (
    <CartProvider>
      {activeCart && <Cart toggleModalHandler={toggleModalHandler} />}
      <Header toggleModalHandler={toggleModalHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
