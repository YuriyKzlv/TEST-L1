import React from 'react';
import PropTypes from 'prop-types';

import MuiPagination from '@mui/material/Pagination';

import style from './Pagination.module.css';

function Pagination({
  count,
  page,
  onChange,
}) {
  return (
    <MuiPagination
      className={style.pagination}
      count={count}
      page={page}
      onChange={(_, numPg) => onChange(numPg)}
      variant="outlined"
      color="secondary"
    />
  );
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
