import React from 'react';
import PropTypes from 'prop-types';

import { Container } from '@mui/material';

import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';
import ModalAddNews from '../ModalAddNews/ModalAddNews';
import ModalEditProfile from '../ModalEditProfile/ModalEditProfile';

import style from './UserInfo.module.css';

function UserInfo({
  isOwner,
  loading,
  getUserByIdError,
  user,
}) {
  if (!loading && getUserByIdError) return <Error error="user not found" />;
  if (loading && !getUserByIdError) return <Spiner />;

  return (
    <Container
      maxWidth="xl"
      className={style.container}
    >
      <div className={style.about_user}>
        <img
          className={style.about_user__avatar}
          src={
            user.avatar
              ? `${process.env.REACT_APP_BASE_URL}/${user.avatar}`
              : '/defaultAvatar.png'
          }
          alt="avatar"
        />
        <ul className={style.about_user__list}>
          <li className={style.about_user__item}>
            Name:
            {user.firstName}
            {' '}
            {user.lastName}
          </li>
          <li className={style.about_user__item}>
            Login:
            {user.login}
          </li>
          <li className={style.about_user__item}>
            Email:
            {user.email}
          </li>
        </ul>
      </div>
      {
        isOwner && (
        <div className={style.edit_data}>
          <ModalAddNews />
          <ModalEditProfile />
        </div>
        )
      }
    </Container>
  );
}

UserInfo.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  getUserByIdError: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default UserInfo;
