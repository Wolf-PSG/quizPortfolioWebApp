import React, { useState, useEffect } from 'react';
import axios from 'axios';

const submitQuiz = (props) => {
  return (
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post);
    axios.post('http://127.0.0.1:5000/api/v1/quiz', props).then((res) => { console.log(res); }).catch((err) => { console.log(err); });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'correctAnswer') setPost({ ...post, [id]: parseInt(value, 10) });
    setPost({ ...post, [id]: value });
  };

  )}

export default submitQuiz;