// store.js
import React, { createContext, useReducer } from 'react';

let initialState = [];
const questionStore = createContext(initialState);
const { Provider } = questionStore;

const QuestionStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state = initialState, action) => {
    switch (action.type) {
      case 'SET_QUESTION':
        const {_id} = action.Question;
        initialState.push(_id);
        return initialState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { questionStore, QuestionStateProvider };
