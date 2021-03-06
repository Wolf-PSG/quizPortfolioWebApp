import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './create-form.style.scss';
// first monitor comment -- wow

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);
const CreateQuestion = (state) => {
  const { id } = state.location.state;
  const history = useHistory();
  const [post, setPost] = useState({
    quizID: id,
    image: '',
    question: '',
    answerSelectionOne: '',
    answerSelectionTwo: '',
    answerSelectionThree: '',
    answerSelectionFour: '',
    correctAnswer: 0,
  });
  const [quizPost, setQuizPost] = useState([]);
  const [file, setFile] = useState('');
  const [imageState, setImageState] = useState({
    file: null,
  });

  const {
    image, question, answerSelectionOne, answerSelectionTwo,
  } = post;

  useEffect(() => {
    if (image !== '' && question !== '' && answerSelectionOne !== '' && answerSelectionTwo !== '') {
      axios.post('https://quiz-maker-psg-api.herokuapp.com/api/v1/question', post)
        .then((res) => {
          setQuizPost([...quizPost, res.data.id]);
          toast.dark('Question Created');
        })
        .catch(() => { toast.dark('Error in submitting question, try again'); });
      setPost({
        quizID: id,
        question: '',
        answerSelectionOne: '',
        answerSelectionTwo: '',
        answerSelectionThree: '',
        answerSelectionFour: '',
        correctAnswer: 0,
        image: '',
      });
      setImageState({ file: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const handleSubmit = async (e) => { // submitting image first then posting the data
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', file);
    const res = await axios.post('https://quiz-maker-psg-api.herokuapp.com/api/v1/uploads', formData);
    setPost({ ...post, image: res.data.file });
  };

  const handleChange = (e) => { // Handling text input changes
    const { id, value } = e.target;
    if (id === 'correctAnswer') return setPost({ ...post, [id]: parseInt(value, 10) });
    setPost({ ...post, [id]: value });
  };

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setImageState(URL.createObjectURL(imageFile));
  };

  const handleSuccess = () => {
    history.push({
      pathname: '/dashboard',
    });
  };

  return (
    <div className="question-form">
      <form className="questions-form" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
        <div className="form-input">
          {/*  htmlFor is to tell react what thehtml entered is going to be for */}
        </div>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
        />
        { imageState ? (
          <img src={imageState} alt=" Your image here " />) : <div />}
        <h2> Question Title </h2>
        <input
          type="text"
          id="question"
          value={post.question}
          onChange={handleChange}
        />
        <div className="form-input">
          <h1 htmlFor="answers"> Answers </h1>
          <div className="form-input">
            <input
              type="text"
              id="answerSelectionOne"
              value={post.answerSelectionOne}

              onChange={handleChange}
            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={1} checked={post.correctAnswer === 1} onClick={handleChange} />

            <input
              type="text"
              id="answerSelectionTwo"
              onChange={handleChange}
              value={post.answerSelectionTwo}

            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={2} checked={post.correctAnswer === 2} onClick={handleChange} />

            {' '}
            <input
              type="text"
              id="answerSelectionThree"
              value={post.answerSelectionThree}

              onChange={handleChange}
            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={3} checked={post.correctAnswer === 3} onClick={handleChange} />

            {' '}
            <input
              type="text"
              id="answerSelectionFour"
              value={post.answerSelectionFour}
              onChange={handleChange}
            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={4} checked={post.correctAnswer === 4} onClick={handleChange} />

          </div>
        </div>
        <button className="btn" onClick={handleSubmit}> Submit Question </button>
        <button className="btn" onClick={handleSuccess}>
          Finish Quiz
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateQuestion;
