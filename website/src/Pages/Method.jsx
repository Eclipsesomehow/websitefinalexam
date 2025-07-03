import React, { useState } from "react";
import { useCart } from "../CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Shipping.css";

const Method = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  
  const shippingInfo = location.state || {};            //info get, don't
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

  
  const [shippingMethod, setShippingMethod] = useState("standard");
  const shippingMethodLabel =
    shippingMethod === "standard" ? "Standard Shipping" : "Express Shipping";
  const shippingCost = shippingMethod === "standard" ? 0 : 4.99;
  const total = subtotal + shippingCost;

  return (
    <div className="shipping-page">

      <div className="shipping-left">
        <div className="shipping-progress">
          <span className="progress-step">Cart</span>
          <span className="progress-sep">{'>'}</span>
          <span className="progress-step">Details</span>
          <span className="progress-sep">{'>'}</span>
          <span className="progress-step active">Shipping</span>
          <span className="progress-sep">{'>'}</span>
          <span className="progress-step">Payment</span>
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

        </div>
        
        <div className="method-shipping-methods">
          
          <div className="method-shipping-title">Shipping method</div>
          
          <div
            className={`method-shipping-option${shippingMethod === "standard" ? " selected" : ""}`}
            onClick={() => setShippingMethod("standard")}
          >
            
            <span className="method-radio">
              {shippingMethod === "standard" && <span className="method-radio-dot" />}
            </span>
            
            <span>Standard Shipping</span>
            <span className="method-shipping-price">Free</span>
          
          </div>
          
          <div
            className={`method-shipping-option${shippingMethod === "express" ? " selected" : ""}`}
            onClick={() => setShippingMethod("express")}
          >
              <span className="method-radio">
              {shippingMethod === "express" && <span className="method-radio-dot" />}

            </span>
            <span>Express Shipping</span>
            <span className="method-shipping-price">$4.99</span>

          </div>

        </div>


        <div className="shipping-buttons">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/shipping", { state: shippingInfo })}
          >
          
            Back

          </button>


          <button
            type="button"
            className="go-btn"
            onClick={() =>
              navigate("/payment", {
                state: {
                  ...shippingInfo,
                  shippingMethod: shippingMethod === "standard" ? "Standard Shipping" : "Express Shipping",
                },
              })
            }
          >
            Continue
          </button>



        </div>
      </div>
      <div className="shipping-right">
        {cartItems.map((item) => (
          <div className="shipping-summary-item" key={item.id + item.size}>
            <img src={item.img} alt={item.name} className="shipping-summary-img" />
            <div>
              <div className="shipping-summary-name">{item.name}</div>
              <div className="shipping-summary-price">${item.price.toFixed(2)}</div>
            </div>
          </div>
        )
        )
        }


        <div className="shipping-summary-totals">
          
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>


          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingMethod === "standard" ? "Free" : "$4.99"}</span>
          </div>

          
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Method;