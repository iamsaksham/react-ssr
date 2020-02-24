import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PDPDetail from '../../components/PDPDetail';

function PDP({ match, staticContext }) {
  let initialWindowData;
  if (typeof window !== 'undefined') {
    initialWindowData = window.__initialData__;
    delete window.__initialData__;
  } else {
    initialWindowData = staticContext.initialData;
  }

  const [initialData, setInitialData] = useState(initialWindowData || {});

  useEffect(() => {
    if (!initialData.pdpData) {
      fetch(`https://node-sample-api.herokuapp.com/api/products/${match.params.id}`)
        .then(data => data.json())
        .then((data) => {
          setInitialData({ pdpData: data });
        });
    }
  }, []);

  return (
    <div className="pdp-wrapper">
      <Header match={match} />
      <PDPDetail productDetails={initialData.pdpData || {}} />
      <Footer />
    </div>
  );
}

export default PDP;
