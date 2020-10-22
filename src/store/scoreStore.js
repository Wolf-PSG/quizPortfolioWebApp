// store.js
import React, { createContext, useReducer } from 'react';

let initialState = 0;
const scoreStore = createContext(initialState);
const { Provider } = scoreStore;

const ScoreStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state = initialState, action) => {
    switch (action.type) {
      case 'CORRECT':
        // const {_id} = action.Question;
        initialState++;
        return initialState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { scoreStore, ScoreStateProvider };
