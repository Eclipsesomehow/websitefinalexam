import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import { useCart } from "../CartContext";


const productData = {
  1: {
    name: "Crop T-Shirt",
    images: [
      require("../Components/Assets/cropt.png"),
      require("../Components/Assets/cropt.png"),
      require("../Components/Assets/cropt.png"),
    ],
    price: 19.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A stylish crop t-shirt perfect for summer.",
  },

  3: {
    name: "Mini Shorts",
    images: [
      require("../Components/Assets/minishorts.png"),
      require("../Components/Assets/minishorts.png"),
      require("../Components/Assets/minishorts.png"),
    ], 
    price: 29.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Comfortable mini shorts for casual wear.",
  },
    5: {
    name: "Polo T-Shirt",
    images: [
      require("../Components/Assets/polo.png"),
      require("../Components/Assets/polo.png"),
      require("../Components/Assets/polo.png"),
    ],
    price: 20.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Classic polo t-shirt with a modern fit.",
  },

  6: {
    name: "Jeans",
    images: [
      require("../Components/Assets/jeans.png"),
      require("../Components/Assets/jeans.png"),
      require("../Components/Assets/jeans.png"),
    ],
    price: 34.99,
    sizes: ["28", "30", "32", "34", "36"],
    description: "Stylish jeans with a comfortable fit.",
  },

  7: {
    name: "Polo Shirt",
    images: [
      require("../Components/Assets/kidspolo.png"),
      require("../Components/Assets/kidspolo.png"),
      require("../Components/Assets/kidspolo.png"),
    ],
    price: 14.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Cute polo shirt for kids, perfect for any occasion.",
  },
}


const Product = () => {
  const { id } = useParams();
  const product = productData[id] || productData[1]; 
  const { addItem, openCart, currency, currencyRates, currencySymbols } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cartOverlay, setCartOverlay] = useState(false);

  


  const formatPrice = (price) =>
    `${currencySymbols[currency]}${(price * currencyRates[currency]).toFixed(2)}`;



  const handleAddToCart = () => {
    if (!selectedSize) return; 
    addItem({
      id: id, 
      name: product.name,
      price: product.price,
      size: selectedSize,
      img: product.images[0], 
    });
    openCart();
    setCartOverlay(true);
    setTimeout(() => setCartOverlay(false), 1500); 
  };

  return (
    <div className="product-page">
      <div className="product-images">
        <div className="thumbnails">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className={`thumbnail ${selectedImage === idx ? "active" : ""}`}
              onClick={() => setSelectedImage(idx)}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={product.images[selectedImage]} alt={product.name} />
        </div>
      </div>
      <div className="product-details">
        <h2>{product.name}</h2>
        <div className="sizes">
          <p>Size:</p>
          <div className="size-options">
            {product.sizes.map((size) => (
              <div
                key={size}
                className={`size-box ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        
        <div className="price">
            <p>Price:</p>
            {formatPrice(product.price)}
        </div>
        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          Add to Cart
        </button>
        <div className="description">{product.description}</div>
      </div>
      {cartOverlay && (
        <div className="cart-overlay">
          Added to cart!
        </div>
      )}
    </div>
  );
};

export default Product;