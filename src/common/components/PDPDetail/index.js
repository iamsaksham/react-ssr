import React from 'react';

import './index.css';

const PDPDetail = ({ productDetails }) => {
  return (
    <div className='page-wrapper'>
      <div className="detail-wrapper">
        <div className='image-wrapper'>
          <img src={productDetails.img} />
        </div>
        <div className="detail-text">
          <div className="detail-item">Name - {productDetails.name}</div>
          <div className="detail-item">Price - {productDetails.price}</div>
          <div className="detail-item">Rating - {productDetails.rating}</div>
          <div className="detail-item">Description - {productDetails.description}</div>
        </div>
      </div>
    </div>
  );
};

export default PDPDetail;
