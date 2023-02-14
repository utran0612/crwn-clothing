import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import CartContext from "../../contexts/cart.context";
import { useContext } from "react";
export const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const handleClick = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="cart-icon-container" onBlur={handleClick}>
      <ShoppingIcon className="shopping-icon" onClick={handleClick} />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
