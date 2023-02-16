import { createContext } from "react";
import { useState, useEffect } from "react";

// here contains all the functions we need within the scope of the context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  totalPrice: 0,
});

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if found, increment quantity and return
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // else, return new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the current quantity of the current item that user want to remove
  const existingCartItem = cartItemToRemove.quantity;

  // check if quantity is 1, if it is remove that item from the cart
  if (existingCartItem === 1) {
    return cartItems.filter((cartItem) => {
      return cartItem.id !== cartItemToRemove.id;
    });
  }

  // return back cartItems with the item with new reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCartItem = (cartItems, itemToDelete) => {
  return cartItems.filter((cartItem) => {
    return cartItem.id !== itemToDelete.id;
  });
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //where I define the functionality of addItemToCart => can use this function elsewhere in the app
  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemFromCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));

  const deleteItemFromCart = (itemToDelete) =>
    setCartItems(deleteCartItem(cartItems, itemToDelete));

  // the reasons for using useEffect for cartCount but not addItemToCart
  // 1. I need to use addItemToCart outside of this
  // 2. For the cartCount, only need cartCount var itself, no need for the newCartCount function to be exported
  // in value.
  // 3. useEffect will be triggered everytime cartItems changes!
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (totalCount, currentObject) => totalCount + currentObject.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (total, current) => total + current.quantity * current.price,
      0
    );
    setTotalPrice(newTotal);
  }, [cartItems]);

  // all the values that I want to use globally
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    deleteItemFromCart,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
