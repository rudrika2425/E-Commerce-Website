import React from 'react';
import './Hero.css';
import hero_image from '../Assets/hero_image.png';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Discover the Latest Trends</h2>
        <div>
         
          <p>New Arrivals,</p>
          <p>Just for You</p>
        </div>
        
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;