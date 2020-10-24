import React, {useEffect, useState, useContext } from 'react';
import './play.style.scss';
import { scoreStore } from '../../store/scoreStore';

const Play = (props) => {
  const state = useContext(scoreStore);
  const [hidden, setHidden] = useState('question-container');
  const { dispatch } = state;
  console.log(props);
  const {image, question, answerSelectionFour,answerSelectionThree,answerSelectionTwo,answerSelectionOne, correctAnswer} = props;

  const handleClick = (e) => {
    const { id } = e.target;
    const check = correctAnswer.toString();
    if (id === check) {
      dispatch({ type: 'CORRECT' });
    }
    setHidden('hidden');
  };

  return (
    <div>
      {/* <h1 className={`score ${active}`}>
        {`You Scored ${questionState.currentScore}`}
      </h1> */}
      <div className={hidden}>
        <h1 id="questionTitle">
          {question}
        </h1>

        <h1> {state.score} </h1>

        <div className="image-container">
        <img className="question-image" alt="questionImage" src={(`/${image}`)} onClick={(e) => (console.log(e.target))}/>
        </div>
        <div id="results" />
        <button onClick={handleClick} id="1">
          {answerSelectionOne}
        </button>
        <button onClick={handleClick} id="2">
          {answerSelectionTwo}
        </button>

        { answerSelectionThree ? (
        <button onClick={handleClick} id="3">
          {answerSelectionThree}
        </button> ) : <div/>
        }

        { answerSelectionFour ? (
        <button onClick={handleClick} id="4">
          {answerSelectionFour}
        </button> ):  <div/>
        }
      </div>
    </div>

  );
};

export default Play;
