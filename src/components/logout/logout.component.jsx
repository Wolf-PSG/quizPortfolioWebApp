import React from 'react';
// import {connect} from 'react-redux'
// import { createStructuredSelector} from 'reselect';
// import {selectCurrentUser} from '../../redux/user/user.selector'

const Logout = () => (
  localStorage.clear()
);

export default Logout;
