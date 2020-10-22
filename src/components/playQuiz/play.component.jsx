import React, {useEffect, useState } from 'react';
import './play.style.scss';
// import { scoreStore } from '../../store/scoreStore';

const Play = (props) => {
  // const score = useContext(scoreStore);
  // const { dispatch } = score;

  const { questions } = props.props;
  const [questionState, setQuestionState] = useState({
    currentScore: 0,
    currentQuestion: 0,
    title: '',
    optionOne: '',
    optionTwo: '',
    optionThree: '',
    optionFour: '',
    correctAnswer: '',
    image: '',
  });

  const [hidden, setHidden] = useState('');
  const [active, setActive] = useState('hidden');

  // const [imageState, setImageState] = useState('<img className="question-image"/>')

  const { correctAnswer} = questionState;

  useEffect(() => {
    function setElements() {
      handleChange();
    }
    setElements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const handleChange = () => {
    if (questions.length > 0) {
      setQuestionState((state) => ({
        ...state,
        currentScore: questionState.currentScore,
        currentQuestion: (questionState.currentQuestion),
        title: questions[questionState.currentQuestion].question,
        optionOne: questions[questionState.currentQuestion].answerSelectionOne,
        optionTwo: questions[questionState.currentQuestion].answerSelectionTwo,
        optionThree: questions[questionState.currentQuestion].answerSelectionThree,
        optionFour: questions[questionState.currentQuestion].answerSelectionFour,
        correctAnswer: questions[questionState.currentQuestion].correctAnswer,
        image: questions[questionState.currentQuestion].image,
      }));
      // setImageState(questionState.image);
    }
  };

  const handleClick = (e) => {
    const { id } = e.target;
    if (id === correctAnswer) {
      setQuestionState({ ...questionState, currentQuestion: (questionState.currentQuestion++), currentScore: questionState.currentScore++ });
      if ((questions.length > questionState.currentQuestion) === true) {
        handleChange();
      } else {
        setHidden('hidden');
        setActive('active');
      }
    } else {
      setQuestionState({ ...questionState, currentQuestion: (questionState.currentQuestion++) });
      if ((questions.length > questionState.currentQuestion) === true) {
        handleChange();
      } else {
        setHidden('hidden');
        setActive('active');
      }
    }
  };
  console.log(`Image state: ${questionState.image}`)

  return (
    <div onClick={(e) => (console.log(e.target.className))}>
      <h1 className={`score ${active}`}>
        {`You Scored ${questionState.currentScore}`}
      </h1>
      <div className={`question-container ${hidden}`}>
        <h1 id="questionTitle">
          {questionState.title}
          ;
        </h1>
        <div className="image-container">
        <img className="question-image" alt="questionImage" src={(`/${questionState.image}`)} onClick={(e) => (console.log(e.target))}/>
        </div>
        <div id="results" />
        <button onClick={handleClick} id="1">
          {questionState.optionOne}
        </button>
        <button onClick={handleClick} id="2">
          {questionState.optionTwo}
        </button>

        { questionState.optionThree ? (
        <button onClick={handleClick} id="3">
          {questionState.optionThree}
        </button> ) : <div/>
        }

        { questionState.optionFour ? (
        <button onClick={handleClick} id="4">
          {questionState.optionFour}
        </button> ):  <div/>
        }
      </div>
    </div>

  );
};

export default Play;
