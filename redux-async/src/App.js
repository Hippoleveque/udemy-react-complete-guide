import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    
    if (!cart.changed) {
      return;
    }

    dispatch(sendCartData(cart));

    const identifier = setTimeout(
      () => dispatch(uiActions.showNotification(null)),
      5000
    );

    return () => clearTimeout(identifier);
  }, [cart, dispatch]);

  useEffect(() => {

    dispatch(fetchCartData());

    const identifier = setTimeout(
      () => dispatch(uiActions.showNotification(null)),
      5000
    );

    return () => clearTimeout(identifier);
  }, [dispatch]);


  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
