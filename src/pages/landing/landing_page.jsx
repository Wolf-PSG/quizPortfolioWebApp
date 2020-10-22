import React from 'react';
import { Link } from 'react-router-dom';
import './landing_page.style.scss';


const Landing = () => {
  return (
    <div className="dashboard">
      <h1> Welcome to QuizzUP </h1>
      <p>
        The All in One Quiz design and distribution Service
      </p>
      <button>
        <Link className="option" to="/signin"> Signin </Link>
      </button>

    </div>
  );
};

export default Landing;
