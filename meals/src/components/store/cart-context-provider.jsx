import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    let newItems = [...state.items];
    const existingIdx = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (existingIdx !== -1) {
      const existingItem = { ...state.items[existingIdx] };
      existingItem.amount += action.item.amount;
      newItems[existingIdx] = existingItem;
    } else {
      newItems.push(action.item);
    }
    const newAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return { items: newItems, totalAmount: newAmount };
  }

  if (action.type === "REMOVE_ITEM") {
    const removeIdx = state.items.findIndex((el) => el.id === action.id);
    const removeItem = { ...state.items[removeIdx] };
    let newItems = [...state.items];
    if (removeItem.amount === 1) {
      newItems = newItems.filter((item) => item.id !== removeItem.id);
    } else {
      removeItem.amount -= 1;
      newItems[removeIdx] = removeItem;
    }
    const newAmount = state.totalAmount - removeItem.price;
    return { items: newItems, totalAmount: newAmount };
  }

  if (action.type === "CLEAR") {
    return defaultCart;
  }

  return defaultCart;
};

const CartProvider = (props) => {
  const [cartState, cartDispatcher] = useReducer(cartReducer, defaultCart);

  const handleAddItem = (item) => {
    cartDispatcher({ type: "ADD_ITEM", item: item });
  };

  const handleRemoveItem = (id) => {
    cartDispatcher({ type: "REMOVE_ITEM", id: id });
  };

  const handleClearCart = () => {
    cartDispatcher({ type: "CLEAR" });
  };

  const context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
