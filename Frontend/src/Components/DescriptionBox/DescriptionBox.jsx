import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          <span>Description </span>
        </div>
        <div
          className={`descriptionbox-nav-box ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
         <span>Reviews</span>
        </div>
      </div>
      <div className={`descriptionbox-description ${activeTab === 'description' ? 'active' : ''}`}>
      <div className="additional-information">
                        
                        <span>Manufacturer: </span>MIXFIT INDIA, mixfitcreation@gmail.com
                        <br />
                        <span>Packer: </span>MIXFIT INDIA, mixfitcreation@gmail.com
                        <br />
                        <span>Importer: </span>MIXFIT INDIA, mixfitcreation@gmail.com
                        <br />
                        <span>Item Dimensions : </span> 38.1 x 35.6 x 2 Centimeters
                        <br />
                        <span>Net Quantity:  </span>1.00 count
                        <br />
                        <span>Generic Name:  </span>Cami Shirt
                        <br />
                        

                        </div>
      </div>
      <div className={`descriptionbox-description ${activeTab === 'reviews' ? 'active' : ''}`}>
      <div className="reviews">
  <span>
    Review 1 <span role="img" aria-label="5 stars">⭐⭐⭐⭐⭐</span>
  </span>
  <br />
  "Perfect fit and incredibly comfortable, my new favorite sweater!"
  <br />
  <br />
  <span>
    Review 2 <span role="img" aria-label="4 stars">⭐⭐⭐⭐</span>
  </span>
  <br />
  "Stylish jeans with great stretch, just a tad long for my height."
  <br />
  <br />
  <span>
    Review 3 <span role="img" aria-label="5 stars">⭐⭐⭐⭐⭐</span>
  </span>
  <br />
  "Beautiful dress with a vibrant color, perfect for any occasion."
  <br />
  <br />
  <span>
    Review 4 <span role="img" aria-label="4 stars">⭐⭐⭐⭐</span>
  </span>
  <br />
  "Super soft hoodie, keeps me warm and cozy all day."
  <br />
  <br />
  <span>
    Review 5 <span role="img" aria-label="5 stars">⭐⭐⭐⭐⭐</span>
  </span>
  <br />
  "High-quality fabric and great design, totally worth the price."
</div>

      </div>
    </div>
  );
}

export default DescriptionBox;


