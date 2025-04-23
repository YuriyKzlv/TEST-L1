import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

import localStyle from './Search.module.css';

function Search({
  searchVariants,
  searchField,
  setSearchField,
  setSearchType,
  searchType,
}) {
  const [value, setValue] = useState(searchField);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchField(value);
    }, 600);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={localStyle.search}>
      <SearchIcon className={localStyle.search_icon} />
      <TextField
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={localStyle.search_input}
      />
      <FormControl className={localStyle.select}>
        <InputLabel id="demo-simple-select-label">
          Search by
        </InputLabel>
        <Select
          value={searchType}
          label="search by"
          onChange={(e) => setSearchType(e.target.value)}
        >
          {
            Object.values(searchVariants).map((item) => (
              <MenuItem
                value={item.value}
                key={item.value}
              >
                {item.value}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
}

Search.propTypes = {
  searchField: PropTypes.string.isRequired,
  setSearchField: PropTypes.func.isRequired,
  setSearchType: PropTypes.func.isRequired,
  searchType: PropTypes.string.isRequired,
  searchVariants: PropTypes.shape({}).isRequired,
};

export default Search;
