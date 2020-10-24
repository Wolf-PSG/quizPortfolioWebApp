import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './finishQuiz.style.scss';

const FinishQuiz = (state) => {
  const { score } = state.location.state;
  const history = useHistory();
  const handleSubmit = () => {
    history.push({
      pathname: '/',
    });
  };

  //   useEffect(() => {
  //     if (state.location.state.score) {
  //       score = parseInt(state.loLcation.state.score, 10);
  //     }
  //     console.log(state.location.state.score);
  //     console.log(score);
  //   }, []);

  return (
    <div className="finish-container">
      {score ? (
        <h1>
          {' '}
          Well done you scored:
            {' '}
          {score}
        </h1>
      ) : (<h1> Oops - it looks like you didn't play any quiz </h1>)}
      <button className="goHome" onClick={handleSubmit}> Go back to quiz-maker </button>
    </div>
  );
};

export default FinishQuiz;
