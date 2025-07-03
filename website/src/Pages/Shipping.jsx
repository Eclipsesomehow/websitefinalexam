import React, { useState } from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import "./Shipping.css";

const Shipping = () => {
  const { cartItems, currency, currencyRates, currencySymbols } = useCart();
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  
  const formatPrice = (price) =>
    `${currencySymbols[currency]}${(price * currencyRates[currency]).toFixed(2)}`;

  
  const [contact, setContact] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [note, setNote] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    
    if (
      !contact ||
      !firstName ||
      !secondName ||
      !address ||
      !number ||
      !city ||
      !postal ||
      !province ||
      !country
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    navigate("/method", {
      state: {
        contact,
        firstName,
        secondName,
        address,
        number,
        note,
        city,
        postal,
        province,
        country,
        saveInfo,
      },
    });
  };

  return (
    <div className="shipping-page">

      <div className="shipping-left">

        <div className="shipping-progress">
          
          <span className="progress-step">Cart</span>
          <span className="progress-sep">{'>'}</span>
          <span className="progress-step active">Details</span>
          <span className="progress-sep">{'>'}</span>
          <span className="progress-step">Shipping</span>
          <span className="progress-sep">{'>'}</span>
          <span className="progress-step">Payment</span>

        </div>


        <form className="shipping-form" onSubmit={handleContinue}>
          <label>Contact</label>
          <input
            type="text"
            placeholder="Email or mobile phone number"
            value={contact}
            onChange={e => setContact(e.target.value)}
          />

          <label>Shipping address</label>
          <div className="shipping-names">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Second name"
              value={secondName}
              onChange={e => setSecondName(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Number"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Shipping note (optional)"
            value={note}
            onChange={e => setNote(e.target.value)}
          />

          <div className="shipping-row">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Postal code"
              value={postal}
              onChange={e => setPostal(e.target.value)}
            />
            <input
              type="text"
              placeholder="Province"
              value={province}
              onChange={e => setProvince(e.target.value)}
            />
          </div>
          <select value={country} onChange={e => setCountry(e.target.value)}>
            <option value="">Country/Region</option>
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            
          </select>
          <div className="shipping-save">
            <input
              type="checkbox"
              id="save-info"
              checked={saveInfo}
              onChange={e => setSaveInfo(e.target.checked)}
            />

            <label htmlFor="save-info">Save this information for a future fast checkout</label>

          </div>
          {error && <div className="shipping-error">{error}</div>}
          <div className="shipping-buttons">
            <button type="button" className="back-btn" onClick={() => navigate("/cart")}>
              Back to cart
            </button>
            <button type="submit" className="go-btn">
              Continue
            </button>

          </div>
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
            <span>Calculated at next step</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;