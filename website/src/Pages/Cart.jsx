import React from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    updateSize,
    currency,
    currencyRates,
    currencySymbols,
  } = useCart();
  const navigate = useNavigate();



  
  const formatPrice = (price) =>              //currency thing
    `${currencySymbols[currency]}${(price * currencyRates[currency]).toFixed(2)}`;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <div className="cart-empty">Your cart is empty.</div>;
  }






  return (
    <div className="cart-container">

      <h1 className="cart-title">Cart</h1>

      <div className="cart-list">
        {cartItems.map((item, idx) => (
          <div
            key={item.id + item.size}
            className={`cart-item-row${
              idx !== cartItems.length - 1 ? " cart-item-divider" : ""
            }`}>


            <div className="cart-item-info">
              <div className="cart-item-name">{item.name}</div>

              <div className="cart-item-price">{formatPrice(item.price)}</div>

              <div className="cart-item-sizes">
                Size:
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <span
                    key={size}
                    className={`cart-size-box${
                      item.size === size ? " selected" : ""
                    }`}
                    onClick={() => updateSize(item.id, item.size, size)}>
                      
                    {size}
                  </span>
                ))}


              </div>
              <div className="cart-item-qty">
                <button
                  onClick={() => updateQuantity(item.id, item.size, -1)}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, item.size, 1)}>
                  +
                </button>
              
              </div>

            </div>


            <img src={item.img} alt={item.name} className="cart-item-img" />
          </div>
        ))}


      </div>
      <div className="cart-total">Total: {formatPrice(total)}</div>
      <button
        className="cart-continue-btn"
        onClick={() => navigate("/shipping")}>

        Continue

      </button>


      
    </div>
  );
};

export default Cart;