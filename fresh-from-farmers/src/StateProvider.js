import React, { createContext, useContext, useReducer } from "react";

// Create a context for state management
export const StateContext = createContext();

// StateProvider component to wrap around your app
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Hook to use the state in other components
export const useStateValue = () => useContext(StateContext);
