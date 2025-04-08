import React from 'react';
import './Offers.css';
import exclusive_image from '../Assets/exclusive_image.png';

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive Deals Await</h1>
        
        <h1>Unlock Special Offers</h1>
       
        <h1>on Our Best Sellers</h1>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;