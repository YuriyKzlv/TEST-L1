import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Container } from '@mui/material';

import Pagination from '../Pagination/Pagination';
import Post from '../Post/Post';
import settings from '../../constants/settings';
import usePagination from '../../hooks/usePagination';

import style from './UserNews.module.css';

function UserInfo({
  user,
}) {
  const news = useMemo(() => user.news || [], [user.news]);

  const {
    pagesCount,
    activePage,
    setActivePage,
    pageItems,
  } = usePagination(news, settings.NEWS_PER_PAGE);

  return (
    <Container maxWidth="xl" className={style.container}>
      <div className={style.news}>
        {
          (pageItems)
          && pageItems.map((el) => (
            <Post
              key={el.id}
              tag={el.tag}
              title={el.title}
              text={el.text}
              author={user.login}
              authorId={user.id}
              image={el.image}
            />
          ))
        }
      </div>
      <Pagination
        count={pagesCount}
        page={activePage}
        onChange={setActivePage}
      />
    </Container>
  );
}

UserInfo.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};
export default UserInfo;
