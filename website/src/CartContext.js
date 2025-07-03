import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const currencyRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
};

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Start with empty array
  const [currency, setCurrency] = useState("USD");

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const addItem = (item) => {
    setCartItems((items) => {
      // Check if item with same id and size exists
      const existingIndex = items.findIndex(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existingIndex !== -1) {
        // Increase quantity
        const updated = [...items];
        updated[existingIndex].quantity += item.quantity || 1;
        return updated;
      } else {
        // Add new item
        return [...items, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  const updateQuantity = (id, size, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const updateSize = (id, oldSize, newSize) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.size === oldSize
          ? { ...item, size: newSize }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        openCart,
        closeCart,
        cartItems,
        addItem,
        updateQuantity,
        updateSize,
        currency,
        setCurrency,
        currencyRates,
        currencySymbols,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};