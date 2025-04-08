import React, {  useState, useEffect } from 'react';
import Item from '../Items/Item'; // Corrected path
import './Popular.css'
const Popular = () => {
    
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/popularinwomen')
            .then((response) => response.json())
            .then((data) => setPopularProducts(data))
            .catch((error) => console.error("Error fetching popular products:", error));
    }, []);

    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {popularProducts.length > 0 ? (
                    popularProducts.map((item, i) => (
                        <Item 
                            key={i} 
                            // {...item}
                            id={item.id} 
                            name={item.name} 
                            image={item.image} 
                            new_price={item.new_price} 
                            old_price={item.old_price} 
                            // // props
                        />
                    ))
                ) : (
                    <p>No popular products available</p>
                )}
            </div>
        </div>
    );
};

export default Popular;
