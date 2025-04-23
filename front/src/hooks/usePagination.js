import { useState } from 'react';

import settings from '../constants/settings';

export default function usePagination(
  items = [],
  itemsPerPage = settings.DEFAULT_NEWS_PER_PAGE,
) {
  const [activePage, setActivePage] = useState(1);

  const pagesCount = Math.ceil(items.length / itemsPerPage);

  const startItemIndex = (activePage - 1) * itemsPerPage;
  const endItemIndex = startItemIndex + itemsPerPage;
  const pageItems = items.slice(startItemIndex, endItemIndex);

  return {
    pagesCount,
    activePage,
    setActivePage,
    pageItems,
  };
}
