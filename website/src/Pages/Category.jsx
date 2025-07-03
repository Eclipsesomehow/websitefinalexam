import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Category.css";
import { useCart } from "../CartContext";
import cropt from "../Components/Assets/cropt.png";
import linent from "../Components/Assets/linent.png";
import minishorts from "../Components/Assets/minishorts.png";
import textshorts from "../Components/Assets/textshorts.png";
import polo from "../Components/Assets/polo.png";
import jeans from "../Components/Assets/jeans.png";
import kidspolo from "../Components/Assets/kidspolo.png";
import cotton from "../Components/Assets/cotton.png";
import cart from "../Components/Assets/cart.png";

const items = {
  women: [
    { id: 1, name: "Crop T-Shirt", img: cropt, price: 19.99, inStock: true },
    { id: 2, name: "Linen T-Shirt", img: linent, price: 24.99, inStock: false },
    { id: 3, name: "Mini Shorts", img: minishorts, price: 29.99, inStock: true },
    { id: 4, name: "Textile Shorts", img: textshorts, price: 39.99, inStock: false },
  ],
  men: [
    { id: 5, name: "Polo T-Shirt", img: polo, price: 20.99, inStock: true },
    { id: 6, name: "Jeans", img: jeans, price: 34.99, inStock: true },
  ],
  kids: [
    { id: 7, name: "Polo Shirt", img: kidspolo, price: 14.99, inStock: true },
    { id: 8, name: "Cotton Trousers", img: cotton, price: 12.99, inStock: false },
  ],
};

const Category = () => {
  const { category } = useParams();
  const categoryItems = items[category] || [];
  const { currency, currencyRates, currencySymbols } = useCart();

  
  const formatPrice = (price) =>
    `${currencySymbols[currency]}${(price * currencyRates[currency]).toFixed(2)}`;



  return (
    <div>
      
      <h2 className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      
      <div className="grid">
        {categoryItems.map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            style={{
              textDecoration: "none",
              color: "inherit",
              pointerEvents: item.inStock ? "auto" : "none",
            }
            }
            >
            
            <div
              className={`grid-item${item.inStock === false ? " out-of-stock" : ""}`}
              style={item.inStock === false ? { pointerEvents: "none" } : {}}
            >
              
              <img src={item.img} alt={item.name} width={280} />
              
              <p>{item.name}</p>
              
              <p className="item-price">{formatPrice(item.price)}</p>
              
              {!item.inStock && <span className="stock-label">Out of Stock</span>}
              
              {item.inStock && (
                <span className="cart-icon">

                  <img src={cart} width={30} alt="Add to cart" />

                </span>
              )
              }
            </div>
          </Link>
        )
        )
        }
      </div>
    </div>
  );
};

export default Category;