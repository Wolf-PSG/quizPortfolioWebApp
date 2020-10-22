import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './create-form.style.scss';
// first monitor comment -- wow 
//she told me put my heart in the bag and nobdy gets hurt

const api = process.env.REACT_APP_API_QUESTION;
const uploadAPI = process.env.REACT_APP_API_UPLOADS

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);
const CreateQuestion = (state) => {
  const {id} = state.location.state;
  const history = useHistory();
  const [post, setPost] = useState({
    quizID: id,
    image: '',
    question: '',
    answerSelectionOne: '',
    answerSelectionTwo: '',
    answerSelectionThree: '',
    answerSelectionFour: '',
    correctAnswer: '',
  });

  const {image, question, answerSelectionOne, answerSelectionTwo} = post

  useEffect(() => {
    if (image !== '' && question !== '' && answerSelectionOne !== '' && answerSelectionTwo !== '' ) {
      axios.post(api, post)
      .then(res => setQuizPost([...quizPost, res.data.id]))
      .catch(err => {console.log(err)});
      setPost({    
        quizID: id,
        question: '',
        answerSelectionOne: '',
        answerSelectionTwo: '',
        answerSelectionThree: '',
        answerSelectionFour: '',
        correctAnswer: parseInt('', 10),
        image: '',})
    setImageState({file:null})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  const [quizPost, setQuizPost] = useState([]);

  const [file, setFile] = useState('');
  const [imageState, setImageState] = useState({
    file: null,
  });

  const handleSubmit = async (e) => { //submitting image first then posting the data
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', file);
    let res = await axios.post(uploadAPI, formData);
    setPost({...post, image:res.data.file});
  };

  const handleChange = (e) => { //Handling text input changes
    const { id, value } = e.target;
    if (id === 'correctAnswer') return setPost({ ...post, [id]: parseInt(value, 10) });
    setPost({ ...post, [id]: value });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
    const image = e.target.files[0];
    console.log(image);
    setFile(image);
    setImageState(URL.createObjectURL(image));
  }

  const handleSuccess = () => {
    history.push({
          pathname:"/dashboard",
    })
  };

  return (
    <div className="question-form">
      <form className="questions-form" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data" >
        <div className="form-input-material">
          {/*  htmlFor is to tell react what thehtml entered is going to be for */}
        </div>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
              />
              {/* <button type="submit" className="btn" onClick={handleImageUpload}> submit </button> */}
        { imageState ? (
        <img src={imageState} alt=' Placeholder '/>) : <div/>}
          <h2> Question Title </h2>
          <input
              type="text"
              id="question"
              className="form-control-material"
              onChange={handleChange}
            />
        <div className="form-input-material">
          <h1 htmlFor="answers"> Answers </h1>
          <div className="form-input-material">
            <input
              type="text"
              id="answerSelectionOne"
              className="form-control-material"
              onChange={handleChange}
            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={1} onClick={handleChange} />

            <input
              type="text"

              id="answerSelectionTwo"
              className="form-control-material"
              onChange={handleChange}
            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={2} onClick={handleChange} />

            {' '}
            <input
              type="text"
              id="answerSelectionThree"
              className="form-control-material"
              onChange={handleChange}
            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={3} onClick={handleChange} />

            {' '}
            <input
              type="text"
              id="answerSelectionFour"
              className="form-control-material"
              onChange={handleChange}
            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={4} onClick={handleChange} />

          </div>
        </div>
        <button className="btn" onClick={handleSubmit}> Submit Question </button>
        <button className="btn" onClick={handleSuccess}>
        Finish Quiz 
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
