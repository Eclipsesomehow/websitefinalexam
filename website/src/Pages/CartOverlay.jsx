import React from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import "./CartOverlay.css";


const CartOverlay = () => {
  const {
    cartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    updateSize,
    currency,
    currencyRates,
    currencySymbols,
  } = useCart();




  const navigate = useNavigate();

  
  const formatPrice = (price) =>
    `${currencySymbols[currency]}${(price * currencyRates[currency]).toFixed(2)}`;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );






  if (!cartOpen) return null;

  return (
    <div className="cart-overlay-bg" onClick={closeCart}>

      <div className="cart-overlay" onClick={(e) => e.stopPropagation()}>

        <div className="cart-header">

          <span>My Bag</span>
          <span>({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>

        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (

            <div className="empty-cart">Your cart is empty.</div>

          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id + item.size}>
                <div className="cart-overlay-item-info">
                  <div className="cart-overlay-item-name">{item.name}</div>
                  <div className="cart-item-price">{formatPrice(item.price)}</div>
                  <div className="cart-item-size">
                    Size:
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <span
                        key={size}
                        className={`cart-size-box ${item.size === size ? "selected" : ""}`}
                        onClick={() => updateSize(item.id, item.size, size)}>

                        {size}

                      </span>
                    ))}


                
                  </div>
                </div>
              
                <div style={{ position: "relative" }}>  
                  
                  <img src={item.img} alt={item.name} className="cart-overlay-item-img" />
                  
                  <button className="cart-item-qty-minus" onClick={() => updateQuantity(item.id, item.size, -1)}>-</button>
                  
                  <span className="cart-item-qty-count">{item.quantity}</span>
                  
                  <button className="cart-item-qty-plus" onClick={() => updateQuantity(item.id, item.size, 1)}>+</button>
                
                </div>
              </div>
            ))
          )}


        </div>
        {cartItems.length > 0 && (
          <div className="cart-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>


        )
        }


        <div className="cart-actions">
          <button
            className="view-bag"
            onClick={() => {
              closeCart();
              navigate("/cart");
            }
          }
          >

            View Bag

          </button>


          <button
            className="checkout-button"
            onClick={() => {
              closeCart();
              navigate("/shipping");
            }
          }
          >

            Check Out
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;