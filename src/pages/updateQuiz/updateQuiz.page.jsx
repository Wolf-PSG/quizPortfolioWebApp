import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './updateQuiz.style.scss';
import axios from 'axios';

const UpdateQuiz = () => {
  const history = useHistory();
  const isInitialMount = useRef(true);
  const isFileChanged = useRef(true);
  const [quiz, setQuiz] = useState({
    id: '',
    title: '',
  });
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});
  const [file, setFile] = useState('');
  const [imageState, setImageState] = useState({
    file: null,
  });
  const [url, setUrl] = useState('Your custom URL you can share for others to play');
  useEffect(() => {
    async function getQuiz() {
      const { pathname } = window.location;
      const searchID = pathname.split('/updateQuiz/');
      const Quiz = await axios.get(`https://quiz-maker-psg-api.herokuapp.com/api/v1/quiz/${searchID[1]}`);
      const { title, id } = Quiz.data.data.doc;
      setQuiz({ title, id });
    }
    getQuiz();
    return () => toast.dark('Update your quiz');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getQuestions() {
      if (quiz.id !== '') {
        const questionsArray = await axios.get(`https://quiz-maker-psg-api.herokuapp.com/api/v1/question?quizID=${quiz.id}`);
        questionsArray.data.data.doc.forEach((element, i) => {
          const {
            quizID, image, question, answerSelectionFour, answerSelectionThree, answerSelectionTwo, answerSelectionOne, correctAnswer, _id,
          } = element;
          setQuestions((values) => [...values, {
            quizID: quizID[0].id, id: _id, image, question, answerSelectionOne, answerSelectionTwo, answerSelectionThree, answerSelectionFour, correctAnswer,
          }]);
        });
      }
    }
    getQuestions();
  }, [quiz.id]);

  useEffect(() => {
    async function pathWithImage() {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else if (!isFileChanged.current) {
        await axios.patch(`https://quiz-maker-psg-api.herokuapp.com/api/v1/question/${question.id}`, question);
      }
    }
    pathWithImage();
  }, [isFileChanged]);

  const handleClick = (e) => {
    const { id } = e.target;
    const state = questions[id];
    setQuestion({ ...state });
    setImageState({ file: state.image });
  };

  const handleFileUpload = async (e) => { // submitting image first then posting the data
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', file);
    const res = await axios.post('https://quiz-maker-psg-api.herokuapp.com/api/v1/uploads', formData).then(() => toast.dark('Image Changed'));
    setQuestion({ ...question, image: res.data.file });
    isFileChanged.current = false;
  };

  const handleSubmit = async (e) => {
    if (!imageState.file) {
      handleFileUpload(e);
    } else {
      await axios.patch(`https://quiz-maker-psg-api.herokuapp.com/api/v1/question/${question.id}`, question).then(() => toast.dark('Question Updated'));
    }
    // window.location.reload();
  };

  const handleDelete = (e) => {
    const { id } = e.currentTarget;
    axios.delete(`https://quiz-maker-psg-api.herokuapp.com/api/v1/question/${id}`).then(() => toast.dark('Question Deleted'))
    window.location.reload();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setQuestion({ ...question, [id]: value });
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    document.getElementById('fileUpload').value = '';
    setFile(image);
    setImageState(URL.createObjectURL(image));
  };

  const handleAddQuestion = () => {
    const { id, title } = quiz;
    history.push({
      pathname: '/createQuizzes',
      state: { id, title },
    });
  };

  const handleURLCreate = () => {
    const { id } = quiz;
    setUrl(`https://quiz-maker-psg.netlify.app/playQuiz/${id}`);
  };

  const playQuiz = () => {
    const { id } = quiz;
    history.push({
      pathname: `/playQuiz/${id}`,
    });
  };

  const fixBrokenImages = (e) => {
    e.target.src = 'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg';
  };
  return (
    <div>
      <h2>
        {' '}
        {quiz.title}
        {' '}
      </h2>
      <div className="questionOptions">
        <button onClick={handleURLCreate}> Create URL to send to friends </button>
        <h2>
          {' '}
          {url}
          {' '}
        </h2>

        { questions.map((element, i) => {
          const { question } = element;
          return (
            <div key={i} className="cross">
              <button key={i} id={i} className="questionLink" onClick={handleClick}>
                {question}
                {/* // eslint-disable-next-line */}
                <a className="delete" key={i} id={element.id} onClick={handleDelete}><FontAwesomeIcon key={i} className="fontIcon" id={element.id} icon={faTimes} size="2x" /></a>
                <br />
              </button>
            </div>

          );
        })}
      </div>
      <button className="newQuestion" onClick={handleAddQuestion}> Add New Question </button>
      {/* <UpdateQuestions /> */}
      <div className="form-container">
        <form className="changeQuestionForm" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
          {/*  htmlFor is to tell react what thehtml entered is going to be for */}
          <input
            id="fileUpload"
            type="file"
            name="photo"
            onChange={handleFileChange}
          />
          { imageState.file ? (<img onError={fixBrokenImages} src={imageState.file} alt=" Placeholder " />) : ( <img onError={fixBrokenImages} src={imageState} alt=" Placeholder " /> )}
          <h2> Question Title </h2>

          <input
            className="inputField"
            type="text"
            id="question"
            onChange={handleChange}
            value={question.question || ''}
          />
          <h1 htmlFor="answers"> Answers </h1>
          <input
            className="inputField"
            type="text"
            id="answerSelectionOne"
            onChange={handleChange}
            value={question.answerSelectionOne || ''}
          />
          <input
            className="inputField"
            type="text"
            id="answerSelectionTwo"
            onChange={handleChange}
            value={question.answerSelectionTwo || ''}
          />
          {' '}
          <input
            className="inputField"
            type="text"
            id="answerSelectionThree"
            onChange={handleChange}
            value={question.answerSelectionThree || ''}
          />
          {' '}
          <input
            className="inputField"
            type="text"
            id="answerSelectionFour"
            onChange={handleChange}
            value={question.answerSelectionFour || ''}
          />
          <button type="submit" className="btn" onClick={handleSubmit}> Change Question </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
export default UpdateQuiz;
