import React, { useState } from "react";
import { useCart } from "../CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Shipping.css"; 

const Payment = () => {
  const { cartItems, currency, currencyRates, currencySymbols } = useCart();
  const navigate = useNavigate();
  const location = useLocation();


  const shippingInfo = location.state || {};
  const contact = shippingInfo.contact || "";
  const addressLine = [
    shippingInfo.firstName,
    shippingInfo.secondName,
    shippingInfo.address,
    shippingInfo.number,
    shippingInfo.city,
    shippingInfo.postal,
    shippingInfo.province,
    shippingInfo.country,
  ]
    .filter(Boolean)
    .join(", ");
  const shippingMethod = shippingInfo.shippingMethod || "Standard Shipping";
  const shippingCost = shippingMethod === "Express Shipping" ? 4.99 : 0;

  

  const formatPrice = (price) =>
    `${currencySymbols[currency]}${(price * currencyRates[currency]).toFixed(2)}`;



  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;


 
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    
    if (
      !cardNumber.match(/^\d{16}$/) ||
      !holderName ||
      !expDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/) ||
      !cvv.match(/^\d{3,4}$/)
    ) 
    
    {
      setError("Please fill in all card details correctly.");
      return;
    }

    setError("");
    setSuccess(true);
    setTimeout(() => {
      navigate("/confirmation"); 
    }, 1500);
  };

  return (
    <div className="shipping-page">
      
      <div className="shipping-left">
        
        <div className="shipping-progress">
          <span className="progress-step">Cart</span>
          <span className="progress-sep">{'>'}</span>
          <span className="progress-step">Details</span>
          <span className="progress-sep">{'>'}</span>
          <span className="progress-step">Shipping</span>
          <span className="progress-sep">{'>'}</span>
          <span className="progress-step active">Payment</span>
        </div>

        <div className="method-contact-box">
          
          <div className="method-field-row">
            
            <div>
              <div className="method-label">Contact</div>
              <div className="method-value">{contact}</div>
           
            </div>
           
            <div>
              <div className="method-label">Ship to</div>
              <div className="method-value">{addressLine}</div>
            </div>

          </div>

          <div className="method-field-row">
            <div>
              
              <div className="method-label">Shipping method</div>
              
              <div className="method-value">
                {shippingMethod === "Express Shipping"
                  ? `Express Shipping (${formatPrice(4.99)})`
                  : `Standard Shipping (Free)`}
              </div>
            </div>
          </div>
        </div>
        
        
        <form className="payment-form" onSubmit={handlePay}>
          
          <div className="method-shipping-title" style={{ marginBottom: 12 }}>
            Payment Method
          </div>
          
          <div className="payment-card-box">
            <input
              type="text"
              placeholder="Card number"
              maxLength={16}
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value.replace(/\D/g, ""))}
            />
            <input
              type="text"
              placeholder="Card holder name"
              value={holderName}
              onChange={e => setHolderName(e.target.value)}
            />
            <div className="payment-card-row">
              <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                value={expDate}
                onChange={e => setExpDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="CVV"
                maxLength={4}
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, ""))}
              />
            </div>

          </div>


          {error && <div className="shipping-error">{error}</div>}
          <button className="go-btn" type="submit" style={{ marginTop: 24 }}>
            Pay Now
          </button>

          {success && <div className="payment-success">Payment successful! Redirecting...</div>}

        </form>
      
      
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

          
          <div className="summary-row">
            <span>Shipping</span>
            <span>
              {shippingMethod === "Express Shipping"
                ? formatPrice(4.99)
                : "Free"}
            </span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;