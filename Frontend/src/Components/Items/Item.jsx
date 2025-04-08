import React from 'react';
import './Item.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const discount = Math.round(((props.old_price - props.new_price) / props.old_price) * 100);
  
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img onClick={scrollToTop} src={props.image} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          ₹{formatPrice(props.new_price)}
        </div>
        <div className="item-price-old">
          ₹{formatPrice(props.old_price)}
        </div>
        {discount > 0 && (
          <span className="discount-badge">{discount}% OFF</span>
        )}
      </div>
      <div className="productdisplay-right-star-new">
        <img src={star_icon} alt="" />
        <img src={star_icon} alt="" />
        <img src={star_icon} alt="" />
        <img src={star_icon} alt="" />
        <img src={star_dull_icon} alt="" />
        <p>(98)</p>
      </div>
    </div>
  );
};

export default Item;