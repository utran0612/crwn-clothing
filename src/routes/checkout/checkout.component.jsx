import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useContext } from "react";
import CartContext from "../../contexts/cart.context";

import "./checkout.styles.scss";

export const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  if (totalPrice === 0) return <h1>Your Cart is Empty</h1>;

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      {totalPrice !== 0 && <span className="total">Total:${totalPrice}</span>}
    </div>
  );
};

export default Checkout;
