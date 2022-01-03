import { useSelector } from "react-redux";
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';


const Cart = (props) => {

  const items = useSelector(state => state.items);


  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map(item => <CartItem item={item}/>)}
        {/* <CartItem
          item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
        /> */}
      </ul>
    </Card>
  );
};

export default Cart;
