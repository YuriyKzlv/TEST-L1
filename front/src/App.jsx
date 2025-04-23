import React, { useEffect, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MainPages from './pages/MainPage/MainPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserPage from './pages/UserPage/UserPage';
import { whoAmI } from './redux/actions/authAction';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(whoAmI());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainPages />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/:userId" element={<UserPage />} />
    </Routes>
  );
}

export default memo(App);
