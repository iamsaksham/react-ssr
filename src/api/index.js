import https from 'https';

export const httpGetRequest = url => {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let data = '';
        res.on('data', d => {
          data += d;
        });
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject({ msg: '404 NOT FOUND' });
          } else {
            resolve(JSON.parse(data));
          }
        });
      })
      .on('error', e => {
        reject(e);
      });
  });
};

export const getInitialPdpData = id => {
  return new Promise((resolve, reject) => {
    httpGetRequest(`https://node-sample-api.herokuapp.com/api/products/${id}`)
      .then(res => {
        resolve({ pdpData: res });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getInitialHomeData = () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      httpGetRequest('https://node-sample-api.herokuapp.com/api/home'),
      httpGetRequest('https://node-sample-api.herokuapp.com/api/products?page=1')
    ])
      .then(([carouselData, productData]) => {
        resolve({ carouselData, productData });
      })
      .catch(err => {
        reject(err);
      });
  });
};
