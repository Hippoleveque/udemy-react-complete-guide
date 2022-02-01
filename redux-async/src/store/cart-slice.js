import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const CART_ENDPOINT =
  "https://react-http-78834-default-rtdb.europe-west1.firebasedatabase.app/cart.json";

const initialCartState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      state.changed = true;
      const itemIdx = state.items.findIndex(
        (item) => item.title === newItem.title
      );

      if (itemIdx !== -1) {
        state.items[itemIdx].quantity += newItem.quantity;
        state.items[itemIdx].total += newItem.quantity * newItem.price;
      } else {
        newItem.total = newItem.quantity * newItem.price;
        state.items.push(newItem);
      }

      state.totalQuantity += newItem.quantity;

      state.totalPrice += newItem.quantity * newItem.price;
    },
    removeItem(state, action) {
      state.changed = true;
      const itemTitle = action.payload;
      const itemIdx = state.items.findIndex((item) => item.title === itemTitle);
      const priceToRemove = state.items[itemIdx].price;
      if (state.items[itemIdx].quantity === 1) {
        state.items = state.items.filter((item) => item.title !== itemTitle);
      } else {
        state.items[itemIdx].quantity--;
        state.items[itemIdx].total -= state.items[itemIdx].price;
      }

      state.totalQuantity--;
      state.totalPrice -= priceToRemove;
    },
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.totalQuantity = action.payload.totalQuantity;
    },
  },
});

export const cartActions = cartSlice.actions;

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending cart",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(CART_ENDPOINT, {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          totalPrice: cart.totalPrice
        }),
      });

      if (!response.ok) {
        throw new Error("Request went wrong");
      }

      const responseData = await response.json();
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart successfully",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Error when sending data",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "fetching...",
        message: "fetching cart",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(CART_ENDPOINT);

      if (!response.ok) {
        throw new Error("Request went wrong");
      }

      const responseData = await response.json();

      return responseData;
    };

    try {
      const cart = await sendRequest();
      dispatch(cartActions.replaceCart({
          items: cart.items || [],
          ...cart
      }));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Error when fetching data",
        })
      );
    }
  };
};

export default cartSlice.reducer;
