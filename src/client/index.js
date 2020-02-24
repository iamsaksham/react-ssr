import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../common/App';

const MOUNT_NODE = document.getElementById('app');

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  MOUNT_NODE
);
