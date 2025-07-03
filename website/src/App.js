import './App.css';
import Navbar from './Components/Navbar/Navbar';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './Pages/Category';
import Product from './Pages/Product';
import { CartProvider } from "./CartContext";
import CartOverlay from "./Pages/CartOverlay";
import Cart from './Pages/Cart';
import Shipping from './Pages/Shipping';
import Method from './Pages/Method';
import Payment from './Pages/Payment';
import Confirmation from './Pages/Confirmation';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <CartOverlay />
          <Routes>
            <Route path="/:category" element={<Category />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/method" element={<Method />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
