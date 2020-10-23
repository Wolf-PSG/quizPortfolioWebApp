import React , {useEffect, useState, useRef} from 'react';
import {useHistory} from 'react-router-dom';
// import UpdateQuestions from '../../components/updateQuestions/updateQuestions.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import './updateQuiz.style.scss';
import axios from 'axios';


const UpdateQuiz = () => {
  const quizAPI = process.env.REACT_APP_API_QUIZ;
  const questionsAPI = process.env.REACT_APP_API_QUESTION;
  const uploadAPI = process.env.REACT_APP_API_UPLOADS
  const history = useHistory();
  const isInitialMount = useRef(true);
  const isFileChanged = useRef(true);
  const [quiz, setQuiz] = useState({
    id: '',
    title: '',
  });
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState({})
  const [file, setFile] = useState('');
  const [imageState, setImageState] = useState({
    file: null,
  });
  useEffect(() => {
    async function getQuiz() {
      const {pathname} = window.location;
      const searchID = pathname.split('/updateQuiz/');
      console.log(searchID)
      const Quiz = await axios.get(`${quizAPI}/${searchID[1]}`);
      console.log(Quiz)
      const {title, id} = Quiz.data.data.doc
      setQuiz({title: title, id: id});
    }
    getQuiz();
    console.log("Quiz useEffect Reload")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getQuestions() {
      if (quiz.id !== '') {
      const questionsArray = await axios.get(`${questionsAPI}?quizID=${quiz.id}`)
      console.log('question get axios')
      console.log(questionsArray.data.data.doc)
      questionsArray.data.data.doc.forEach( (element , i) => {
        const { quizID, image, question, answerSelectionFour,answerSelectionThree,answerSelectionTwo,answerSelectionOne, correctAnswer, _id } = element;
        setQuestions(values => [ ...values, {quizID: quizID[0].id, id:_id, image:image, question:question, answerSelectionOne: answerSelectionOne, answerSelectionTwo:answerSelectionTwo, answerSelectionThree: answerSelectionThree, answerSelectionFour: answerSelectionFour, correctAnswer:correctAnswer}]);
      });
      }
    }
    getQuestions();
  }, [quiz.id])

  useEffect(() => {
    async function pathWithImage() {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!isFileChanged.current) {
        await axios.patch(`${questionsAPI}/${question.id}`, question)
      }
    }
    }
    pathWithImage();
  }, [isFileChanged]
  )

  const handleClick = (e) => {
      const {id} = e.target
      const state = questions[id];
      setQuestion({...state})
      setImageState({file:state.image});

  }

    const handleFileUpload = async (e) => { //submitting image first then posting the data
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', file);
    let res = await axios.post(uploadAPI, formData);
    setQuestion({...question, image:res.data.file});
    isFileChanged.current = false;
  };

  
  const handleSubmit = async (e) => {
    if (!imageState.file) {
      handleFileUpload(e)
    } else {
      await axios.patch(`${questionsAPI}/${question.id}`, question)
    }
    // window.location.reload();
  }

  const handleDelete = (e) => {
    const {id} = e.currentTarget;
    axios.delete(`${questionsAPI}/${id}`);
    window.location.reload();
  }

  const handleChange = (e) => {
    const {id, value} = e.target    
    setQuestion({...question, [id]:value})
  }

    const handleFileChange = (e) => {
    const image = e.target.files[0];
    document.getElementById('fileUpload').value = '';
    setFile(image);
    setImageState(URL.createObjectURL(image));
  }

    const handleAddQuestion = () => {
    const {id, title} = quiz;
    history.push({
          pathname:`/createQuizzes`,
          state:{id, title},
    })
  };

  const fixBrokenImages = (e) => {
      e.target.src = 'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg'

  } 
  return (
    <div>
    <h2> {quiz.title} </h2>
    <div className="questionOptions">
      { questions.map((element , i) => {
        const {question} = element;
        return (
          <div key={i} className="cross"> 
          <button key={i} id={i} className='questionLink' onClick={handleClick}> 
          {question} 
          {/* // eslint-disable-next-line */}
          <a className="delete" key={i} id={element.id} onClick={handleDelete}><FontAwesomeIcon key={i} className="fontIcon" id={element.id} icon={faTimes} size="2x" /></a> 
          <br />
          </button>
          </div>
          
          )
      })}
    </div>
      <button className="newQuestion" onClick={handleAddQuestion} > Add New Question </button>
      {/* <UpdateQuestions /> */}
      <div className="form-container">
        <form className="changeQuestionForm" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data" >
          {/*  htmlFor is to tell react what thehtml entered is going to be for */}
              <input
                id="fileUpload"
                type="file"
                name="photo"
                onChange={handleFileChange}
              />
              {/* <button type="submit" className="btn" onClick={handleImageUpload}> submit </button> */}
        { imageState.file  ? ( <img onError={fixBrokenImages} src={require(`../../../public/${imageState.file}`)} alt=' Placeholder ' onError={(e) => e.target.style.display='none' }/>  ) : <img onError={fixBrokenImages} src={imageState} alt=' Placeholder '/> }
        {/* { imageState ? ( <img onError={fixBrokenImages} src={imageState} alt=' Placeholder '/> ) : <div /> } */}

              {/* <button type="submit" className="btn" onClick={handleImageUpload}> submit </button> */}
        {/* { imageState ? (
        <img src={imageState} alt=' Placeholder '/>) : <div/>} */}
          
          <h2> Question Title </h2>
          
          <input
              className = "inputField"
              type="text"
              id="question"
              onChange={handleChange}
              value={question.question || ''}
            />
          <h1 htmlFor="answers"> Answers </h1>
            <input
              className = "inputField"
              type="text"
              id="answerSelectionOne"
              onChange={handleChange}
              value={question.answerSelectionOne || ''}

            />
            <input
              className = "inputField"
              type="text"
              id="answerSelectionTwo"
              onChange={handleChange}
              value={question.answerSelectionTwo || ''}

            />
            {' '}
            <input
              className = "inputField"
              type="text"
              id="answerSelectionThree"
              onChange={handleChange}
              value={question.answerSelectionThree || ''}

            />
            {' '}
            <input
              className = "inputField"
              type="text"
              id="answerSelectionFour"
              onChange={handleChange}
              value={question.answerSelectionFour || ''}
            />
          <button type="submit" className="btn" onClick={handleSubmit}> Change Question </button>
      </form>
      </div>
    </div>
  )
}
export default UpdateQuiz;
