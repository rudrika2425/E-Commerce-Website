import './App.css';
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';

// Import images using Vite's asset handling
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import PaymentSuccess from './Pages/PaymentSuccess';

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();
  const hide = location.pathname === "/" || location.pathname === "/payment-success";

  return (
    <div>
      {!hide && <Navbar />}
      <Routes>  
        <Route path='/' element={<LoginSignup />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/men' element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path='/kid' element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>  
      {!hide && <Footer />}
      
    </div>
  );
}

export default App;