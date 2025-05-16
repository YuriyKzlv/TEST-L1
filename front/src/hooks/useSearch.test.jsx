import { renderHook } from '@testing-library/react';
import useSearch from './useSearch';

const variant = {
  news: { fields: ['title', 'description'] },
};

const items = [
  { id: 1, title: 'Breaking News', description: 'Something happened' },
  { id: 2, title: 'Tech Update', description: 'New AI released' },
  { id: 3, title: 'Daily Report', description: 'Summary of events' },
];

const useHook = ({ data, field }) => useSearch(data, field, 'news', variant);

describe('useSearch__hook', () => {
  test('if empty field returns original data', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: items, field: '' },
    });
    expect(result.current).toEqual(items);
  });

  test('search by title', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: items, field: 'tech' },
    });
    expect(result.current).toEqual([items[1]]);
  });

  test('search by description', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: items, field: 'summary' },
    });
    expect(result.current).toEqual([items[2]]);
  });

  test('search non-case sensitive', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: items, field: 'BREAKING' },
    });
    expect(result.current).toEqual([items[0]]);
  });

  test('if field not found returns empty array', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: items, field: 'nothing' },
    });
    expect(result.current).toEqual([]);
  });

  test('ignores leading and trailing spaces', () => {
    const { result } = renderHook(useHook, {
      initialProps: { data: items, field: '   tech   ' },
    });
    expect(result.current).toEqual([items[1]]);
  });

  test('refreshes data when the field changes', () => {
    const { result, rerender } = renderHook(useHook, {
      initialProps: { data: items, field: 'breaking' },
    });
    expect(result.current).toEqual([items[0]]);

    rerender({ data: items, field: 'report' });
    expect(result.current).toEqual([items[2]]);
  });

  test('refreshes data when the data changes', () => {
    const newItem = {
      id: 4,
      title: 'AI Daily',
      description: 'Tech summary',
    };

    const { result, rerender } = renderHook(useHook, {
      initialProps: { data: items, field: 'daily' },
    });
    expect(result.current).toEqual([items[2]]);

    rerender({ data: [...items, newItem], field: 'daily' });
    expect(result.current).toEqual([items[2], newItem]);
  });
});
