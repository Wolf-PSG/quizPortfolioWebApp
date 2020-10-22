import React, { useState } from 'react';
import SignIn from '../../components/signup_in/sign-in.component';
import SignUp from '../../components/signup_in/sign-up.component';
import './sign.style.scss';

const SignInAndUp = (props) => {
  const [profileState] = useState(props);
  return (
    <div className="sign-in-up">
      <SignIn {...profileState} />
      <SignUp {...profileState} />
    </div>
  );
};

export default SignInAndUp;
