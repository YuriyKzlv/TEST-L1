import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import UserInfo from '../../components/UserInfo/UserInfo';
import UserNews from '../../components/UserNews/UserNews';
import Header from '../../components/Header/Header';
import withAuthRedirect from '../../HOC/withAuthentication';
import { getUserById } from '../../redux/actions/usersAction';

function UserPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { user, loading } = useSelector((state) => state.users);
  const { getUserByIdError } = useSelector((state) => state.users.errors);
  const { id } = useSelector((state) => state.auth);

  const isOwner = useMemo(() => +userId === +id, [userId]);

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [userId]);

  return (
    <>
      <Header />
      <UserInfo
        isOwner={isOwner}
        loading={loading}
        getUserByIdError={getUserByIdError}
        user={user}
      />
      <UserNews
        user={user}
        isOwner={isOwner}
      />
    </>
  );
}

export default memo(withAuthRedirect(UserPage));
