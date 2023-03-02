import CartContext from "../../contexts/cart.context";
import { useContext } from "react";


import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";
export const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const handleClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={handleClick}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
