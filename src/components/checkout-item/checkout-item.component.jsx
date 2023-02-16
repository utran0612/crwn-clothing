import { useContext } from "react";
import CartContext from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

export const CheckoutItem = ({ item }) => {
  const { name, price, quantity, imageUrl } = item;
  const { addItemToCart, removeItemFromCart, deleteItemFromCart } =
    useContext(CartContext);

  const removeItem = () => removeItemFromCart(item);
  const addItem = () => addItemToCart(item);
  const deleteItem = () => deleteItemFromCart(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>

      <span className="name">{name}</span>

      <div className="quantity">
        <div className="arrow" onClick={removeItem}>
          &#10094;
        </div>
        <span className="value"> {quantity}</span>
        <div className="arrow" onClick={addItem}>
          &#10095;
        </div>
      </div>

      <span className="price">${price}</span>

      <div className="remove-button" onClick={deleteItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
