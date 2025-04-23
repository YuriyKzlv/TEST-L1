import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const withAuthentication = (Component) => function () {
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate replace to="/login" />;
  }

  return <Component />;
};

export default withAuthentication;
