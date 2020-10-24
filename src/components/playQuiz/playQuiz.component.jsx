/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Play from './play.component';
import { scoreStore } from '../../store/scoreStore';

const PlayQuiz = () => {
  const history = useHistory();
  const store = useContext(scoreStore);
  const { state } = store;
  const { score } = state;
  const [questions, setQuestions] = useState([]);
  const [post, setPost] = useState({
    quizID: '',
    name: '',
    score: '',
  });

  const { pathname } = window.location;
  const searchID = pathname.split('/playQuiz/');
  useEffect(() => {
    async function getQuestions() {
      const questionsArray = await axios.get(`https://quiz-maker-psg-api.herokuapp.com/api/v1/question/?quizID=${searchID[1]}`);
      questionsArray.data.data.doc.forEach((element, i) => {
        const {
          quizID, image, question, answerSelectionFour, answerSelectionThree, answerSelectionTwo, answerSelectionOne, correctAnswer, _id,
        } = element;
        setQuestions((values) => [...values, {
          quizID: quizID[0].id, id: _id, image, question, answerSelectionOne, answerSelectionTwo, answerSelectionThree, answerSelectionFour, correctAnswer,
        }]);
        setPost({ ...post, quizID: quizID[0].id });
      });
      // setQuiz({ ...quiz, title: quizDoc.title, questions: quizDoc.questions});
    }
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPost({ ...post, [id]: value });
  };

  const handlePost = (e) => {
    const scoredPost = post;
    scoredPost.score = score;
    e.preventDefault();
    axios.post('https://quiz-maker-psg-api.herokuapp.com/api/v1/score', scoredPost).catch((err) => {console.log(`${err} \n ${post}`)});
    history.push({
      pathname: '/finishQuiz',
      state: { score },
    });
  };

  return (
    <div>
      <form className="quizTitle-form" onSubmit={handlePost}>
        <div>
          <label> Add your name to once your're done and hit the submit button to submit </label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
          />
          <button type="submit" className="btn"> Submit Your name </button>
        </div>
      </form>

      { questions.map((element, i) => (
        <Play className="hidden" key={i} {...element} />
      ))}
    </div>
  );
};

export default PlayQuiz;
