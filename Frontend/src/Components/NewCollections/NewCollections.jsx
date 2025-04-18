import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import Item from '../Items/Item';

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);
  

  useEffect(() => {
    fetch('https://e-commerce-website-h7up.onrender.com/newcollections')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setNewCollection(data))
      .catch((e)=>{console.log(e)});
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      
      <div className="collections">
        {newCollection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
