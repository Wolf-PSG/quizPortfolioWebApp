import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from './store/store';
import { QuestionStateProvider } from './store/questionStore';
import { ScoreStateProvider } from './store/scoreStore';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <QuestionStateProvider>
        <ScoreStateProvider>
          <App />
        </ScoreStateProvider>
      </QuestionStateProvider>
    </StateProvider>
  </React.StrictMode>,

  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
/*
    {/* <div>
          <p>{process.env.REACT_APP_API_QUESTION}</p>
<p> {process.env.REACT_APP_API_SIGN_UP}</p>
<p> {process.env.REACT_APP_API_SIGN_IN}</p>
<p> {process.env.REACT_APP_API_QUIZ}</p>
<p> {process.env.REACT_APP_API_UPLOADS}</p>

    </div>
*/
