import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Play from './play.component';
// import './playQuiz.style.scss';
import { scoreStore } from '../../store/scoreStore';

const PlayQuiz = () => {
  const score = useContext(scoreStore);
  const { state } = score;
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function getQuestions() {
      const { pathname } = window.location;
      const searchID = pathname.split('/playQuiz/');
      const questionsArray = await axios.get(`https://quiz-maker-psg-api.herokuapp.com/api/v1/question/?quizID=${searchID[1]}`);
      questionsArray.data.data.doc.forEach((element, i) => {
        const {
          quizID, image, question, answerSelectionFour, answerSelectionThree, answerSelectionTwo, answerSelectionOne, correctAnswer, _id,
        } = element;
        setQuestions((values) => [...values, {
          quizID: quizID[0].id, id: _id, image, question, answerSelectionOne, answerSelectionTwo, answerSelectionThree, answerSelectionFour, correctAnswer,
        }]);
      });
      // setQuiz({ ...quiz, title: quizDoc.title, questions: quizDoc.questions});
    }
    getQuestions();
    questions.map((element, i) => { console.log(element); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* <h1>
        {' '}
        {`${quiz.title} Quiz`}
      </h1> */}
      <h2>
        {' '}
        Your Score
        {state.score}
      </h2>
      { questions.map((element, i) => (
        <Play className="hidden" key={i} {...element} />
      ))}
    </div>
  );
};

export default PlayQuiz;
