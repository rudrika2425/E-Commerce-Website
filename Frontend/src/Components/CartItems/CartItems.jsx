import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const checkoutHandler = async (amount) => {
    try {
     
      const { data: { key } } = await axios.get(`${import.meta.env.VITE_API_URL}/payment/getkey`);
      const { data: { order } } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/process`, 
        { amount: amount * 100 }
      );
  
      const options = {
        key, 
        amount: order.amount, 
        currency: "INR",
        name: "Your Store Name",
        description: "Purchase Description",
        order_id: order.id,
        handler: async function(response) {
          try {
            const { data } = await axios.post(
              `${import.meta.env.VITE_API_URL}/payment/verify`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              }
            );
            
            if (data.success) {
              navigate(`/payment-success?orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}&amount=${amount}`);
            } else {
              alert("Payment verification failed");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification error");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9000000000"
        },
        theme: {
          color: "#3399cc"
        }
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
  
      rzp.on("payment.failed", function(response) {
        alert(`Payment failed: ${response.error.description}`);
      });
  
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error during checkout. Please try again.");
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>Rs. {e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>Rs. {e.new_price * cartItems[e.id]}</p>
                <img
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt=""
                  className="cartitems-remove-icon"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs. {getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={() => checkoutHandler(getTotalCartAmount())}>Proceed to pay</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;