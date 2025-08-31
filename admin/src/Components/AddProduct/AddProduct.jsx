import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.jpg';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file); // Store file for upload
    setProductDetails({ ...productDetails, image: URL.createObjectURL(file) }); // Preview
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    try {
      let formData = new FormData();
      formData.append("product", image);

      // 1. Upload image
      const uploadResp = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });

      const uploadData = await uploadResp.json();

      if (uploadData.success) {
        // 2. Add product
        const product = { ...productDetails, image: uploadData.image_url };

        const addResp = await fetch(`${import.meta.env.VITE_API_URL}/addproduct`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(product)
        });

        const addData = await addResp.json();

        if (addData.success) {
          alert("✅ Product Added");

          // Reset form
          setProductDetails({
            name: "",
            image: "",
            category: "women",
            new_price: "",
            old_price: ""
          });
          setImage(false);
        } else {
          alert("❌ Failed to add product");
        }
      } else {
        alert("❌ Image upload failed");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="Kid">Kid</option>
          <option value="men">Men</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button onClick={Add_Product} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
