import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Play from './play.component';
// import './playQuiz.style.scss';

const quizAPI = process.env.REACT_APP_API_QUIZ;

const PlayQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    questions: [],
  });
  useEffect(() => {
    async function getQuiz() {
      const param = window.location.search;
      const id = param.split('=');
      const Quiz = await axios.get(`${quizAPI}?_id=${id[1]}`);
      const { doc } = Quiz.data.data;
      console.log(doc[0]);
      const quizDoc = doc[0];
      console.log(quizDoc.questions);
      setQuiz({ ...quiz, title: quizDoc.title, questions: quizDoc.questions});
    }
    getQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>
        {' '}
        {`${quiz.title} Quiz`}
      </h1>
      <Play props={quiz} />
    </div>
  );
};

export default PlayQuiz;
