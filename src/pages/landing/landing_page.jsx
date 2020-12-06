import React from 'react';
import { Link } from 'react-router-dom';
import './landing_page.style.scss';

const Landing = () => (
  <div className="dashboard">
    <h1> Welcome to QuizzUP </h1>
    <p>
      The All in One Quiz design and distribution Service
    </p>
    <Link className="option" to="/signin">
      {' '}
      <button type="button">
        Signin
      </button>
    </Link>

  </div>
);

export default Landing;
