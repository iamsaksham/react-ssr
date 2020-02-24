import React, { useState } from 'react';
import './index.css';

export const Carousel = ({ carouselData }) => {
  const [currentImageKey, setCurrentImageKey] = useState(0);

  return (
    <div className="carousel-wrapper">
      <div className="image-wrapper">
        <div
          className="image-item"
          style={{ left: `-${currentImageKey * 100}vw` }}
        >
          {carouselData.map(({ url: img }, key) => (
            <div className="image-car">
              <img style={{ margin: `auto calc((100vw - 750px)/2)` }} src={img} key={key} />
            </div>
          ))}
        </div>
      </div>
      <div className="paginator">
        {carouselData.map(({ url: img }, key) => (
          <span
            key={key}
            className={`dot ${key === currentImageKey ? 'current' : ''}`}
            onClick={() => setCurrentImageKey(key)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
