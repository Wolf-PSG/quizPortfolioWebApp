// store.js
import React, { createContext, useReducer } from 'react';

let initialState = [];
const quizStore = createContext(initialState);
const { Provider } = quizStore;

const QuizStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state = initialState, action) => {
    switch (action.type) {
      case 'GET_QUIZZES':
        const {_id} = action;
        initialState.push(_id);
        return initialState;
      // case 'NEW_QUIZ':
      //   const {_id} = action;
      //   initialState.push(_id);
      //   return initialState; 
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { quizStore, QuizStateProvider };
