import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

import './App.css';

const App = () => {
  return (
    <Switch>
      {routes.map((route, key) => <Route key={key} {...route } />)}
    </Switch>
  );
}

export default App;
