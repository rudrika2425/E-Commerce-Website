import React,{ useState, useEffect } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'


const ListProduct = () => {
  const[allproducts,setAllProducts]=useState([]);
  const fetchInfo=async()=>{
    await fetch('https://e-commerce-website-h7up.onrender.com/allproducts')
    .then((res)=>res.json())
    .then((data)=>{
      setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product=async(id)=>{
    await fetch("https://e-commerce-website-h7up.onrender.com/removeproduct",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
    
  }

  return (
    
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return <><div key={index} className="listproduct-format-main  listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>Rs. {product.old_price}</p>
            <p>Rs. {product.new_price}</p>
            <p>  {product.category}</p>
            <img  onClick={()=>{remove_product(product.id)}} className="listproduct-remove-icon"src={cross_icon} alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
