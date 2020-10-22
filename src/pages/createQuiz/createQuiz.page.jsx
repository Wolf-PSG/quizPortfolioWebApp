import React, { useContext } from 'react';
import CreateQuizTitle from '../../components/create-form/createQuizTitle.component';
import './createQuiz.style.scss';
import { store } from '../../store/store';

const QuizPage = () => {
  const globalState = useContext(store);
  return (
    <div>
      <CreateQuizTitle {...globalState} />      
    </div>
  );
};

export default QuizPage;
