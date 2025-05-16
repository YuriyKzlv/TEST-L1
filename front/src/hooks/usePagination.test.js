import { act, renderHook } from '@testing-library/react';
import usePagination from './usePagination';
import settings from '../constants/settings';

describe('usePagination', () => {
  const makeItems = (n) => Array.from({ length: n }, (_, i) => `item-${i}`);

  test('default values', () => {
    const data = makeItems(13);
    const { result } = renderHook(
      () => usePagination(data),
    );

    const { pagesCount, activePage, pageItems } = result.current;

    expect(activePage).toBe(1);
    expect(pagesCount).toBe(Math.ceil(13 / settings.DEFAULT_NEWS_PER_PAGE));
    expect(pageItems).toEqual(data.slice(0, settings.DEFAULT_NEWS_PER_PAGE));
  });

  test('switch page', () => {
    const data = makeItems(12);
    const { result } = renderHook(() => usePagination(data, 5));

    expect(result.current.pageItems).toEqual(data.slice(0, 5));

    act(() => {
      result.current.setActivePage(3);
    });

    expect(result.current.activePage).toBe(3);
    expect(result.current.pageItems).toEqual(data.slice(10, 15));
  });

  test('when page > pagesCount', () => {
    const data = makeItems(3);
    const { result } = renderHook(() => usePagination(data, 1));

    expect(result.current.pagesCount).toBe(3);
    expect(result.current.pageItems).toEqual(['item-0']);
  });

  test('if empty data', () => {
    const { result } = renderHook(() => usePagination([], 4));

    expect(result.current.pagesCount).toBe(0);
    expect(result.current.pageItems).toEqual([]);
  });
});
