import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
  totalQuantity: 0, // Ensure this is initialized
};

export default function CartProvider({ children }) {
  const initCart = getcartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);
  const [totalQuantity, setTotalQuantity] = useState(initCart.totalQuantity);

  useEffect(() => {
    const totalPrice = sum(cartItems.map(item => item.price));
    const totalCount = cartItems.length;
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    setTotalPrice(totalPrice);
    setTotalCount(totalCount);
    setTotalQuantity(totalQuantity);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalCount,
        totalPrice,
        totalQuantity, // Ensure this is stored
      })
    );
    console.log('Cart updated:', { items: cartItems, totalPrice, totalCount, totalQuantity });
  }, [cartItems]);

  function getcartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    const parsedCart = storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    console.log('Loaded cart from local storage:', parsedCart);
    return parsedCart;
  }

  const sum = items => items.reduce((prevValue, curValue) => prevValue + curValue, 0);

  const removeFromCart = foodId => {
    const filteredCartItems = cartItems.filter(item => item.food.id !== foodId);
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const { food } = cartItem;
    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity,
    };
    setCartItems(cartItems.map(item => (item.food.id === food.id ? changedCartItem : item)));
  };

  const addToCart = food => {
    const cartItem = cartItems.find(item => item.food.id === food.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount, totalQuantity },
        removeFromCart,
        changeQuantity,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
