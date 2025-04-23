import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '@mui/material';

import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import Post from '../Post/Post';

import usePagination from '../../hooks/usePagination';
import useSearch from '../../hooks/useSearch';

import { getNewsActionCreator } from '../../redux/actions/newsAction';
import {
  SEARCH_OPTIONS,
  SEARCH_TYPES,
} from '../../constants/searchTypes';

import style from './Body.module.css';

function Body() {
  const dispatch = useDispatch();

  const news = useSelector((state) => state.news.newsList);
  const [searchField, setSearchField] = useState('');
  const [searchType, setSearchType] = useState(SEARCH_TYPES.all);

  const searchArray = useSearch(
    news,
    searchField,
    searchType,
    SEARCH_OPTIONS,
  );

  const {
    pagesCount,
    activePage,
    setActivePage,
    pageItems,
  } = usePagination(searchArray);

  useEffect(() => {
    dispatch(getNewsActionCreator());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Search
        searchType={searchType}
        searchField={searchField}
        setSearchField={setSearchField}
        setSearchType={setSearchType}
        searchVariants={SEARCH_OPTIONS}
      />
      <div className={style.news_wrapper}>
        {
          pageItems.map((el) => (
            <Post
              key={el.id}
              tag={el.tag}
              title={el.title}
              text={el.text}
              author={el.author.login}
              authorId={el.author.id}
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

export default Body;
