import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sign-up.styles.scss';

const SignUp = () => {
  const [post, setPost] = useState({
    name: '',
    email: '',
    password: '',
    confirmedPassword: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmedPassword } = post;
    if (password.length < 8) {
      return toast.dark('Passwords must have 8 characters');
    }
    if (password !== confirmedPassword) {
      return toast.dark("Passwords don't match"); // adjust the alert button
    }
    const newUser = await axios.post('https://quiz-maker-psg-api.herokuapp.com/api/v1/users/signup', post);
    if (newUser) {
      toast.dark('User Created');
      setPost({
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
      });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPost({ ...post, [id]: value });
  };
  return (
    <div>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2 className="title"> Don't Have an Account? </h2>
        <span> Sign up with email and password </span>
        <label> name </label>
        <input
          type="text"
          id="name"
          value={post.name}
          className="form__field"
          onChange={handleChange}
        />
        <label> email </label>
        <input
          type="email"
          id="email"
          value={post.email}
          className="form__field"
          onChange={handleChange}
        />
        <label> password </label>
        <input
          type="password"
          id="password"
          value={post.password}
          onChange={handleChange}
        />
        <label> confirm password </label>
        <input
          type="password"
          id="confirmedPassword"
          value={post.confirmedPassword}
          onChange={handleChange}
        />
        <button type="submit"> Sign Up </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
