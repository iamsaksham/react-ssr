import Home from './containers/Home';
import PDP from './containers/PDP';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/pdp/:id?',
    component: PDP
  }
];

export default routes;
