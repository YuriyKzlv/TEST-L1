import { renderHook } from '@testing-library/react';

import useSearch from './useSearch';

const variant = {
  news: { fields: ['title', 'description'] },
};

const news = [
  { id: 1, title: 'Breaking News', description: 'Something happened' },
  { id: 2, title: 'Tech Update', description: 'New AI released' },
  { id: 3, title: 'Daily Report', description: 'Summary of events' },
];

const useHook = ({ data, field }) => useSearch(data, field, 'news', variant);

describe('useSearch__hook', () => {
  test('empty query, should return original list', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: news, field: '' },
    });
    expect(result.current).toEqual(news);
  });

  test('"tech" in title, should return matching item', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: news, field: 'tech' },
    });
    expect(result.current).toEqual([news[1]]);
  });

  test('"summary" in description, should return matching item', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: news, field: 'summary' },
    });
    expect(result.current).toEqual([news[2]]);
  });

  test('case-insensitive query, should match regardless of case', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: news, field: 'BREAKING' },
    });
    expect(result.current).toEqual([news[0]]);
  });

  test('no matches, should return empty array', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: news, field: 'nothing' },
    });
    expect(result.current).toEqual([]);
  });

  test('trimmed query, should ignore extra spaces', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: news, field: '   tech   ' },
    });
    expect(result.current).toEqual([news[1]]);
  });

  test('query changed, should recompute result', () => {
    const { result, rerender } = renderHook(useHook, {
      initialProps: { data: news, field: 'breaking' },
    });
    expect(result.current).toEqual([news[0]]);

    rerender({ data: news, field: 'report' });
    expect(result.current).toEqual([news[2]]);
  });

  test('data changed, should recompute results', () => {
    const newItem = {
      id: 4,
      title: 'AI Daily',
      description: 'Tech summary',
    };

    const { result, rerender } = renderHook(useHook, {
      initialProps: { data: news, field: 'daily' },
    });
    expect(result.current).toEqual([news[2]]);

    rerender({ data: [...news, newItem], field: 'daily' });
    expect(result.current).toEqual([news[2], newItem]);
  });
});
