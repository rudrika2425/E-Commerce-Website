import React, { createContext, useState, useEffect } from "react";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {

  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [amount,setAmount]=useState();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/allproducts`,[])
      .then((response) => response.json())
      .then((data) => setAll_Product(data))
      .catch((error) => console.error("Error fetching products:", error));

    if (localStorage.getItem('auth-token')) {
      fetch(`${import.meta.env.VITE_API_URL}/getcart`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },        
        body: "",
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        return response.json();
      })
      .then((data) => setCartItems(data))
      .catch((error) => console.error("Error fetching cart items:", error));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    const token = localStorage.getItem("auth-token");
    if (token) {
      console.log("token checked");
      fetch(`${import.meta.env.VITE_API_URL}/addtocart`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'auth-token': `${token}`,
          'Content-Type': 'application/json',
        },        
        body: JSON.stringify({ "itemId": Number(itemId) }),
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error adding item to cart:", error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newQuantity = prev[itemId] - 1;
      return { ...prev, [itemId]: Math.max(newQuantity, 0) }; 
    });
    const token = localStorage.getItem('auth-token');
    console.log("remove from cart");
    if (token) {
      console.log("token checked");
      fetch(`${import.meta.env.VITE_API_URL}/removefromcart`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'auth-token': `${token}`,
          'Content-Type': 'application/json',
        },        
        body: JSON.stringify({ "itemId": Number(itemId) }),
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error removing item from cart:", error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    setAmount(totalAmount);
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart ,amount};
  

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
