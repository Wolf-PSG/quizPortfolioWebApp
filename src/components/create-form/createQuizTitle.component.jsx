import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './create-form.style.scss';
import { store } from '../../store/store';

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);
const CreateQuizTitle = () => {
  const history = useHistory();
  const globalUserState = useContext(store);

  const [quizPost, setQuizPost] = useState({
    title: '',
    user: globalUserState.state._id,
  });

  //   const [file, setFile] = useState('');
  //   const [imageState, setImageState] = useState({
  //     file: null,
  //   });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setQuizPost({
      ...quizPost,
      [id]: value,
    });
  };

  const handleSuccessQuiz = async (e) => {
    e.preventDefault();
    const { title, user } = quizPost;
    const newPost = {
      title,
      user,
    };
    axios.post('https://quiz-maker-psg-api.herokuapp.com/api/v1/quiz', newPost).then(
      (res) => {
        const { id } = res.data.data.data;
        history.push({
          pathname: '/createQuizzes',
          state: {
            id,
          },
        });
      },
    ).catch(() => toast.dark('Quiz was not able to created'));
  };
  return (
    <div className="question-form">
      <form className="quizTitle-form" onSubmit={handleSuccessQuiz}>
        <div>
          <label> Quiz Title </label>
          <input type="text" id="title" className="form-control-material" onChange={handleChange} />
          <button type="submit" className="btn">
            Submit Quiz Title
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateQuizTitle;
