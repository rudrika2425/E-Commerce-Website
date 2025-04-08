import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    //const { product } = props;
    const product = props.product;
    const { addToCart } = useContext(ShopContext);

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    
                </div>
                <div className="productdisplay-img">
                    <img src={product.image} alt="" className="productdisplay-main-img" />
                    <div className="details">
                      <div className="product-details">
                      <h2>Product details</h2>
                        
                        <span>Pattern: </span>Solid
                        <br />
                        <span>Fit type: </span>Slim Fit
                        <br />
                        <span>Length: </span>Crop
                        <br />
                        <span>Neck style: </span>Square Neck
                        <br />
                        <span>Country of Origin: </span>India
                        <br />
                        <span>Tags: </span>Modern, Latest
                      </div>


                        <div className="about-item">
                        <h2>About this item</h2>
                        <span>Material: </span>93% Microfiber, 7% Spandex (Lycra)
                        <br />
                        <span>Fit type: </span>Slim Fit
                        <br />
                        <span>Sleeve type: </span>Sleeveless
                        <br />
                        <span>Collar: </span> Collarless
                        <br />
                        <span>Closure:  </span>Pull On
                        <br />
                        <span>Occasions:  </span> Party/ Work/ Outdoor/Daily wear
                        <br />
                        

                        </div>
                    </div>
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="imp">
                    <h2>
                        2K+ bought in past month
                        <br />
                        <br />
                        <span>Limited time deal</span>
                    </h2>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="discount">
                        <h2>-10%</h2>
                    </div>
                    <div className="productdisplay-right-price-new">₹{product.new_price}</div>
                </div>
                <div className="productdisplay-right-price-old">
                    M.R.P. : {product.old_price}
                </div>
                <div className="tax">
                    Inclusive of all taxes
                </div>
                <div className="productdisplay-right-description">
                    Discover the perfect blend of comfort and style with our latest clothing line. Expertly crafted from premium materials, each piece offers exceptional durability and a luxurious feel against the skin. The timeless design ensures versatility, making it suitable for any occasion, whether casual or formal. Embrace the elegance and functionality that define our collection, and elevate your wardrobe with pieces that promise to become your favorites.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => {
                    addToCart(product.id)
                }}>ADD TO CART</button>
                <p className="productdisplay-right-category">
                    L will fit you best based on data from customers who buy the same sizes as you.
                </p>
            </div>
        </div>
    );
}

export default ProductDisplay;
