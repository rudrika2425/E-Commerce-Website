import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Css/PaymentSuccess.css';

const PaymentSuccess = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    orderId: '',
    paymentId: '',
    amount: 0
  });
  const location = useLocation();

  useEffect(() => {
    // Get payment details from URL parameters
    const searchParams = new URLSearchParams(location.search);
    setPaymentDetails({
      orderId: searchParams.get('orderId') || 'N/A',
      paymentId: searchParams.get('paymentId') || 'N/A',
      amount: searchParams.get('amount') || 0
    });
  }, [location]);

  return (
    <div className="payment-success">
      <div className="success-container">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
              fill="#4CAF50" />
            <path 
              d="M8 12L10.5 14.5L16 9" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" />
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <div className="payment-details">
          <div className="detail-item">
            <span>Order ID:</span>
            <span>{paymentDetails.orderId}</span>
          </div>
          <div className="detail-item">
            <span>Payment ID:</span>
            <span>{paymentDetails.paymentId}</span>
          </div>
          <div className="detail-item">
            <span>Amount Paid:</span>
            <span>Rs. {paymentDetails.amount}</span>
          </div>
        </div>
        <p className="success-message">
          Thank you for your purchase! We have sent a confirmation email with your order details.
        </p>
        <div className="action-buttons">
          <Link to="/shop" className="home-button">Continue Shopping</Link>
          <Link to="/cart" className="orders-button">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;