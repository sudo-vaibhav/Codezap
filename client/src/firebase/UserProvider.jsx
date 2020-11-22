import React, { useEffect, useState } from 'react';
import { auth } from './firebase';

//2.
export const AuthContext = React.createContext();

//3.
export const AuthProvider = ({ children }) => {
  const [state, changeState] = useState({
    userPresent: false,
    user: null,
    listener: null,
  });

  useEffect(() => {
    if (state.listener == null) {
      changeState({
        ...state,
        listener: auth.onAuthStateChanged((user) => {
          if (user)
            changeState((oldState) => ({
              ...oldState,
              userDataPresent: true,
              user: user,
            }));
          else {
            changeState((oldState) => ({
              ...oldState,
              userDataPresent: true,
              user: null,
            }));
          }
        }),
      });
    }
    return () => {
      if (state.listener) state.listener();
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
