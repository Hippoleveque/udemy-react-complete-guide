import { createStore } from "redux";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  if (action.type === "ADD_ITEM") {
    const newItem = action.payload;
    const items = [...state.items]; // not completeley recopied
    const itemIdx = items.findIndex((el) => el.title === newItem.title);

    if (itemIdx !== -1) {
      const item = { ...items[itemIdx] };
      item.quantity++;
      item.total = item.quantity * item.price;
      items[itemIdx] = item;
    } else {
      newItem.total = newItem.quantity * newItem.price;
      items.push(newItem);
    }
    const newPrice = state.totalPrice + newItem.amount * newItem.price;
    return {
      items: items,
      totalPrice: newPrice,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const itemTitle = action.payload;
    let items = [...state.items]; // not completeley recopied
    const itemIdx = items.findIndex((el) => el.title === itemTitle);
    const item = { ...items[itemIdx] };
    if (item.quantity === 1) {
      items = items.filter((el) => el.title !== itemTitle);
    } else {
      item.quantity--;
      item.total = item.quantity * item.price;
      items[itemIdx] = item;
    }

    const newPrice = state.totalPrice - item.price;
    return {
      items: items,
      totalPrice: newPrice,
    };
  }

  return state;
};

const store = createStore(cartReducer);

export default store;
