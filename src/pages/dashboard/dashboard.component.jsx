import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { store } from '../../store/store';
import './dashboard.style.scss';
import Card from '../../components/card/card.component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashBoard = () => {
  const [titles, setTitles] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messsage, setMessage] = useState('Loading ...');
  const globalState = useContext(store);
  const { state } = globalState;
  useEffect(() => {
    async function getQuizzes() {
      const userQuiz = await axios.get(`https://quiz-maker-psg-api.herokuapp.com/api/v1/quiz?user=${state._id}`);
      if (userQuiz.data) {
        const { doc } = userQuiz.data.data;
        for (let i = 0; i < doc.length; i++) {
          const { title, _id } = doc[i];
          setTitles((prevState) => [...prevState, title]);
          setId((prevState) => [...prevState, _id]);
        }
        setLoading(false);
      }
      if (userQuiz.data.results === 0) {
        setMessage('');
        return toast.dark('No quizzes found');
      }
    }
    getQuizzes();
  }, [state._id]);
  const array = Object.values(titles);
  return (
    <div className="dashboard">
      <h1> Dashboard: </h1>
      <h2> Your Quizzes </h2>
      {/* <h1>{quiz.titleArray}</h1> */}
      {/* <CollectionsOverview /> */}
      <div>
        {loading ? (
          <h2>
            {messsage}
          </h2>
        ) : (
          array.map((value, index) => <Card key={`${value}${index}`} id={id[index]} titles={value} />))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashBoard;
