import React, { useContext } from 'react';
import { store } from '../../store/store';
// import './dashboard.style.scss';

const About = (props) => {
  const globalState = useContext(store);
  console.log(globalState);
  return (
    <div className="dashboard">
    <h1> About Quiz Maker </h1>
      <p>
        Welcome to Quiz Maker <span role="img" aria-label="emoji">✌</span>
        This is For Parmjit Singh's Portfolio
      </p>
      <h2>
      Key Features:
        <li>
            User login and sign up using JWT
        </li>
        <li>
            Local Storage for user and question
        </li>
        <li>
            Adding and storing images
        </li>
        <li>
            Emailing and abilty to play and share quizzes
        </li>
      </h2>
      <h2>
        I hope you enjoy the Application
      </h2>
      <h3>
        Made with the MERN Stack
      </h3>
    </div>
  );
};

export default About;