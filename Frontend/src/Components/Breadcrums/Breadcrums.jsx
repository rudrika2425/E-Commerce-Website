import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { Link } from 'react-router-dom';

const Breadcrums = (props) => {
    const {product}=props;
  return (
    <div className="breadcrum">
      <Link  className="home"to="/shop">Shop</Link>
       <img src={arrow_icon} alt=""/> 
       <Link className='home' to={`/${product.category}`}>{product.category}</Link>
       <img src={arrow_icon} alt=""/>{product.name}
    </div>
  )
}

export default Breadcrums
