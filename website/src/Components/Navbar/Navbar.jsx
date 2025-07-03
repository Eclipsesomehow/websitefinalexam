import React, { useState } from 'react'
import "./Navbar.css";
import logo from '../Assets/logo.png'
import cart from '../Assets/cart.png'
import dollar from '../Assets/dollar.png'
import { Link, useLocation } from 'react-router-dom';
import { useCart } from "../../CartContext";

const Navbar = () => {
    const location = useLocation();
    const [menu,setMenu] = useState("women")
    const { cartItems, openCart, currency, setCurrency } = useCart();


  const path = location.pathname;
  const isActive = (category) => path.startsWith(`/${category}`);

  return (
    <div className="navbar">

        <div className="menu">
            <li>
                <Link to="/women">Women</Link>
                {isActive("women") ? <hr className="menu-underline" /> : null}
            </li>

            <li>
                <Link to="/men">Men</Link>
                {isActive("men") ? <hr className="menu-underline" /> : null}
            </li>

            <li>
                <Link to="/kids">Kids</Link>
                {isActive("kids") ? <hr className="menu-underline" /> : null}
            </li>
        </div>


      <div className="navbar-center">
        <a href="/" className="navbar-logo"> <img src={logo} width={35} alt="" /></a>
      </div>


      <div className="navbar-right">
        <select
          className="currency-select"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        >
          <option value="USD">USD $</option>
          <option value="EUR">EUR €</option>
          <option value="GBP">GBP £</option>
        </select>

        <a className="cart-link" onClick={openCart} style={{ cursor: "pointer" }}>
          <img src={cart} width={35} alt="" />
          <div className="cartcount">{cartItems.length}</div>
        </a>
      </div>


    </div>
  );
};

export default Navbar;