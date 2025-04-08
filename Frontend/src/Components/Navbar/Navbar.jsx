import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/company_logo_big.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [showMenu, setShowMenu] = useState(false);
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>STYLISH CART</p>
      </div>
      
      <div className="nav-dropdown" onClick={toggleMenu}>
        <span className={showMenu ? "nav-dropdown open" : "nav-dropdown"}>&#9776;</span>
      </div>
      
      <ul className={showMenu ? "nav-menu nav-menu-visible" : "nav-menu"}>
        <li onClick={() => setMenu("shop")}>
          <Link to="/shop">Shop</Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        
        <li onClick={() => setMenu("mens")}>
          <Link to="/men">Men</Link>
          {menu === "mens" ? <hr /> : null}
        </li>
        
        <li onClick={() => setMenu("womens")}>
          <Link to="/women">Women</Link>
          {menu === "womens" ? <hr /> : null}
        </li>
        
        <li onClick={() => setMenu("kids")}>
          <Link to="/kid">Kids</Link>
          {menu === "kids" ? <hr /> : null}
        </li>
      </ul>
      
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button onClick={() => { 
            localStorage.removeItem('auth-token'); 
            window.location.replace('/');
          }}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        
        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;