// store.js
import React, { createContext, useReducer } from 'react';

const scoreStore = createContext();
const { Provider } = scoreStore;

function scoreReducer(state, action) {
  switch (action.type) {
    case 'CORRECT': {
      return { score: state.score + 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
const ScoreStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(scoreReducer, { score: 0 });
  return (<Provider value={{ state, dispatch }}>{children}</Provider>
  );
};

export { scoreStore, ScoreStateProvider };
