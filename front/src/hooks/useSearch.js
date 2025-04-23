import { useState, useEffect } from 'react';
import { get } from 'lodash';

export default function useSearch(
  searchItems,
  searchField,
  searchType,
  searchVariant,
) {
  const [searchResult, setSearchResult] = useState();

  function handleSearch() {
    const result = searchItems
      .filter(
        (element) => searchVariant[searchType].fields.some(
          (field) => get(element, field)
            .trim()
            .toLowerCase()
            .includes(searchField.trim().toLowerCase()),
        ),
      );
    setSearchResult(result);
  }

  useEffect(() => {
    if (searchField.length < 1) {
      setSearchResult(searchItems);
    } else {
      handleSearch(searchField);
    }
  }, [searchField, searchItems, searchType]);

  return searchResult;
}
