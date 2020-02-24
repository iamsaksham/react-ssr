import React from 'react';
import { Link } from 'react-router-dom';

import BackArrow from './arrow-back.png';
import './index.css';

const Header = ({ match={} }) => {
  return (
    <div className='topbar'>
      {match.path && match.path.includes('/pdp/') && (
        <Link to={'/'} className="arrow-image"><img src={BackArrow} /></Link>
      )}
      <header>Tokopedia</header>
    </div>
  );
};

export default Header;
