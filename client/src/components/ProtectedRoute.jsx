import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../firebase/UserProvider';
const ProtectedRoute = ({ children, path, redirectTo }) => {
  const authValue = useContext(AuthContext);
  //   const isAuthenticated = user ? true : false;

  if (authValue.userDataPresent) {
    if (authValue.user == null) {
      return <Redirect to={redirectTo}></Redirect>;
    } else {
      return (
        <Route exact path={path}>
          {children}
        </Route>
      );
    }
  } else {
    return null;
  }
};

export default ProtectedRoute;
