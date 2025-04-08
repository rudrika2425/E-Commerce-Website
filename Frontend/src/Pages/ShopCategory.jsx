import React, { useContext } from 'react';
import './Css/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item';

const ShopCategory = (props) => { 
  const { all_product } = useContext(ShopContext);
  const MatchedCategory = props.category.toLowerCase();

  return (
    <div className='shopcategory'>
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing Products</span> 
        </p>
        
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (MatchedCategory === item.category.toLowerCase()) {
            return <Item 
              key={i} 
              {...item}
            />;
          } 
          else {
            return null;
          }
        })}
      </div>
      
      
    </div>
  );
};

export default ShopCategory;
