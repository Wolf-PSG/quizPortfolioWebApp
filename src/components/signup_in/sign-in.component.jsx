import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../../store/store';
import './sign-in.style.scss';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

const SignIn = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const history = useHistory();
  // const storedJwt = localStorage.getItem('token');
  // set the web token to state -- if no token then set to null
  const [post, setPost] = useState({
    email: '',
    password: '',
  });
  // const [jwt, setJwt] = useState(storedJwt || null);

  const handleSuccess = async (userData) => {
    userData.data.user.loggedIn = true;
    dispatch({ ...userData.data, type: 'SET_CURRENT_USER' });
    history.push('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://quiz-maker-psg-api.herokuapp.com/api/v1/users/login', post).then((res) => {
      localStorage.setItem('token', res.data.token);
      // setJwt(res.data.token);
      // console.log(res);
      handleSuccess(res.data);
    }).catch(() => toast.dark('Details are not correct'));
  };

  const handleChange = (e) => {
    const { id, value } = e.target; // deconstructor the value and name
    if (id === 'email signin') {
      setPost({ ...post, email: value });
    }
    setPost({ ...post, password: value });
  };
  return (
    <div>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h2> Already have an account </h2>
        <label> Email </label>
        <input
          id="email signin"
          type="email"
          onChange={handleChange}
        />
        <label> Password </label>
        <input
          id="password signin"
          type="password"
          onChange={handleChange}
        />
        <button type="submit"> Sign in </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
