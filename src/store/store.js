// store.js
import React, { createContext, useReducer } from 'react';

// const useStateWithLocalStorage = localStorageKey => {
//   const [value, setValue] = React.useState(
//     localStorage.getItem(localStorageKey) || ''
//   );

const initialState = JSON.parse(localStorage.getItem('state')) || { state: { loggedIn: false } };
const store = createContext(initialState);
let newState = {}
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state = initialState, action) => {
    switch (action.type) {
      case 'SET_CURRENT_USER':
        newState = {...action.user, loggedIn: true };
        localStorage.setItem('state', JSON.stringify(newState));
        return newState;
      case 'LOGOUT':
        localStorage.clear();
        newState = {...action.loggedIn};
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
