import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';


export const Listing = ({ productData, handleLoadMore }) => {

  return (
    <div className="listing-wrapper">
      <div className="items-wrapper">
        {productData.map((item, key) => (
          <Link key={key} to={`/pdp/${item.id}`} className="list-item">
            <img src={item.img} />
            <div>{item.name}</div>
            <div>{item.price}</div>
          </Link>
        ))}
      </div>
      <div className="load-more">
        <button onClick={handleLoadMore}>Load More</button>
      </div>
    </div>
  );
};

export default Listing;
