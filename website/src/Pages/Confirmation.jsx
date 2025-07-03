import React from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import confirm from "../Components/Assets/confirm.png";
import "./Shipping.css"; 

const Confirmation = () => {
  const { cartItems, currency, currencyRates, currencySymbols } = useCart();
  const navigate = useNavigate();



  
  const orderNumber = Math.floor(100000 + Math.random() * 900000);



  
  const formatPrice = (price) =>
    `${currencySymbols[currency]}${(price * currencyRates[currency]).toFixed(2)}`;




  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (

    <div className="shipping-page">
      
      <div className="shipping-left" style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
        
        <img src={confirm} alt="Order Confirmed" style={{ width: 90, marginBottom: 24 }} />
        
        <h2 style={{ marginBottom: 12 }}>Thank you for your order!</h2>
        
        <div style={{ fontSize: 18, marginBottom: 32 }}>

          Order number: <b>{orderNumber}</b>

        </div>
        
        <button
          className="go-btn-conf"
          onClick={() => navigate("/")}
        >
          Back to shopping
        </button>
      </div>

      <div className="shipping-right">
        {cartItems.map((item) => (
          
          <div className="shipping-summary-item" key={item.id + item.size}>
            
            <img src={item.img} alt={item.name} className="shipping-summary-img" />
            
            <div>
              <div className="shipping-summary-name">{item.name}</div>

              <div className="shipping-summary-price">{formatPrice(item.price)}</div>
            </div>

          </div>

        )
        )
        }
        
        <div className="shipping-summary-totals">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;