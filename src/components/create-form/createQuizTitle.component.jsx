import React, { useState, useContext } from 'react';
import {useHistory}  from 'react-router-dom';
import axios from 'axios';
import './create-form.style.scss';
import { store } from '../../store/store';

const quizAPI = process.env.REACT_APP_API_QUIZ;

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    console.log(config);
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
    setQuizPost({ ...quizPost, [id]: value });
  };

  const handleSuccessQuiz = async (e) => {
    e.preventDefault();
    const {title, user } = quizPost;
    const newPost = {title, user}
    console.log(newPost);
    axios.post(quizAPI, newPost).then((res) => {
    const {id} = res.data.data.data
    history.push({
      pathname:"/createQuizzes",
      state: {id},
    })
    }, (error) => {
      console.log(error);
    })
  };

//   const handleImageUpload = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('photo', file);
//     axios.post(uploadAPI, formData).then(res => setPost({...post, image: res.data.file}));
//   }

//   const handleFileChange = (e) => {
//     console.log(e.target.files);
//     const image = e.target.files[0];
//     console.log(image);
//     setFile(image);
//     setImageState(URL.createObjectURL(image));
//   }

  return (
    <div className="question-form">
      <form className="quizTitle-form" onSubmit={handleSuccessQuiz}>
        <div>
          <label> Quiz Title </label>
          <input
            type="text"
            id="title"
            className="form-control-material"
            onChange={handleChange}
          />
          <button type="submit" className="btn"> Submit Quiz Title </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuizTitle;
