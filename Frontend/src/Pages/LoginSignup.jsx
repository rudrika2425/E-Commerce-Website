import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Css/LoginSignup.css';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, password, email } = formData;
    if (state === "Sign Up" && !username) {
      alert('Username is required for sign up');
      return false;
    }
    if (!email || !password) {
      alert('Email and password are required');
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validateForm()) return;
   
    try {
      const response = await fetch('https://e-commerce-website-h7up.onrender.com/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        navigate("/shop"); // Changed from window.location.replace()
      } else {
        alert(responseData.errors || "Login failed");
      }
    } catch (error) {
      alert("An error occurred during login");
    }
  };

  const signup = async () => {
    if (!validateForm()) return;
    try {
      const response = await fetch('https://e-commerce-website-h7up.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        navigate("/shop"); // Changed from window.location.replace()
      } else {
        alert(responseData.errors || "Sign up failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {/* Decorative fashion elements */}
        <div className="fashion-icon hanger-icon">&#8982;</div>
        <div className="fashion-icon tag-icon">&#9906;</div>
        
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" &&
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder='Enter Your Name'
            />
          }
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Email Address'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder='Password'
          />
        </div>
       
        <button onClick={() => { state === "Login" ? login() : signup() }}>
          {state === "Login" ? "Sign In" : "Create Account"}
        </button>
        
        <p className="loginsignup-login">
          {state === "Sign Up"
            ? <>Already have an account? <span onClick={() => setState('Login')}>Login here</span></>
            : <>New to our boutique? <span onClick={() => setState('Sign Up')}>Register now</span></>
          }
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;