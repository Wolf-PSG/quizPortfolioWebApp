import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { store } from '../../store/store';
import './dashboard.style.scss';
import Card from '../../components/card/card.component';

const quizAPI = process.env.REACT_APP_API_QUIZ
const DashBoard = () => {
  const [titles, setTitles] = useState([]);
  const [id, setId] = useState([]);
  const globalState = useContext(store);
  const { state } = globalState;
  useEffect(() => {
    async function getQuizzes() {
      const userQuiz = await axios.get(`${quizAPI}?user=${state._id}`)
      if (userQuiz.data) {
        const { doc } = userQuiz.data.data;
        for (let i = 0; i < doc.length; i++) {
          const { title, _id } = doc[i];
          setTitles((prevState) => [...prevState, title]);
          setId((prevState) => [...prevState, _id]);
        }
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
        {array.map((value, index) => <Card key ={index} id={id[index]} titles={value}/>)}
      </div>
      {/* <Card titles={title} ID={id} /> */}
    </div>
  );
};

export default DashBoard;
