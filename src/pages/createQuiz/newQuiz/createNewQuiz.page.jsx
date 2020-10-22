import React, { useState, useEffect, useContext } from 'react';
import CreateQuestion from '../../components/create-form/create-form.component';
import './createQuiz.style.scss';
import { store } from '../../store/store';

const QuizPage = () => {
  const globalState = useContext(store);
  return (
    <div>
      <CreateQuestion {...globalState} />
    </div>
  );
};

export default QuizPage;