import React, { useState } from 'react';
import axios from 'axios';
import './sign-up.styles.scss';

const api = process.env.REACT_APP_API_SIGN_UP;

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
    if (password !== confirmedPassword) {
      alert("passwords don't match"); // adjust the alert button
      return;
    }
    await axios.post(api, post)
      .then((res) => { console.log(res); }).catch((err) => { console.log(err); });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPost({ ...post, [id]: value });
  };
  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h2 className="title"> Don't Have an Account? </h2>
      <span> Sign up with email and password </span>
      <label> name </label>
      <input
        type="text"
        id="name"
        className="form__field"
        onChange={handleChange}
      />
      <label> email </label>

      <input
        type="email"
        id="email"
        className="form__field"

        onChange={handleChange}
      />
      <label> password </label>

      <input
        type="password"
        id="password"
        onChange={handleChange}
      />
      <label> confirm password </label>

      <input
        type="password"
        id="confirmedPassword"
        onChange={handleChange}
      />
      <button type="submit"> Sign Up </button>
    </form>
  );
};

export default SignUp;
