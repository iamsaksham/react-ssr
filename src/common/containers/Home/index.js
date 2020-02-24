import React, { useState, useEffect } from 'react';

import Carousel from '../../components/Carousel';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Listing from '../../components/Listing';

function Home({ match, staticContext }) {
  let initialWindowData;
  if (typeof window !== 'undefined') {
    initialWindowData = window.__initialData__;
    delete window.__initialData__;
  } else {
    initialWindowData = staticContext.initialData;
  }

  const [initialData, setInitialData] = useState(initialWindowData || {});
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (!initialData.carouselData || !initialData.productData) {
      Promise.all([
        fetch('https://node-sample-api.herokuapp.com/api/home'),
        fetch(`https://node-sample-api.herokuapp.com/api/products?page=${pageNumber}`)
      ])
        .then(([carouselData, productData]) => {
          return new Promise(resolve => {
            Promise.all([carouselData.json(), productData.json()]).then(data => {
              resolve(data);
            });
          });
        })
        .then(([carouselData, productData]) => {
          setInitialData({ carouselData, productData });
        });
    }
  }, []);

  const handleLoadMore = () => {
    fetch(`https://node-sample-api.herokuapp.com/api/products?page=${pageNumber + 1}`)
      .then(res => res.json())
      .then(data => {
        setPageNumber(pageNumber + 1);
        setInitialData({
          ...initialData,
          productData: {
            nextPage: data.nextPage,
            previousPage: data.previousPage || 1,
            data: [
              ...initialData.productData.data,
              ...data.data,
            ]
          }
        });
      });
  };

  return (
    <div className="home-wrapper">
      <Header match={match} />
      <Carousel carouselData={(initialData.carouselData && initialData.carouselData.carousel) || []} />
      <Listing productData={(initialData.productData && initialData.productData.data) || []} handleLoadMore={handleLoadMore} />
      <Footer />
    </div>
  );
}

export default Home;
