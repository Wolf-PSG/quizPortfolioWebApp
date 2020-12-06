import React, { useContext } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { store } from '../../store/store';
// import Logout from '../logout/logout.component';
// import {connect} from 'react-redux'
// import { createStrsucturedSelector} from 'reselect';
// import {selectCurrentUser} from '../../redux/user/user.selector'
import './header.style.scss';

const Header = () => {
  const globalUserStore = useContext(store);
  const history = useHistory();
  const { state, dispatch } = globalUserStore;
  return (
    <div className="header">
      <div className="options">
        <Link className="option" to="/quiz"> Create Quiz </Link>
        <Link className="option" to="/dashboard"> Dashboard </Link>
        <Link className="option" to="/about"> About </Link>
        {state.loggedIn
          ? (
            <div
              className="option"
              onClick={() => {
                dispatch({ state: { loggedIn: false }, type: 'LOGOUT' });
                history.push({
                  pathname: '/signin',
                });
              }}
            >
              Sign Out
            </div>
          )
          : (<Link className="option" to="/signin"> Signin </Link>)}

      </div>
    </div>
  );
};

export default Header;

// const mapState = createStructuredSelector({
// 	currentUser: selectCurrentUser,
// })

// export default connect(mapState)(Header);
