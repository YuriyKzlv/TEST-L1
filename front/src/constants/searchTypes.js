export const SEARCH_TYPES = {
  all: 'all',
  text: 'text',
  title: 'title',
  author: 'author',
  tag: 'tag',
};

export const SEARCH_OPTIONS = {
  all: {
    value: SEARCH_TYPES.all,
    label: 'all',
    fields: ['text', 'title', 'author.login', 'tag'],
  },
  text: {
    value: SEARCH_TYPES.text,
    fields: ['text'],
  },
  title: {
    value: SEARCH_TYPES.title,
    fields: ['title'],
  },
  author: {
    value: SEARCH_TYPES.author,
    fields: ['author.login'],
  },
  tag: {
    value: SEARCH_TYPES.tag,
    fields: ['tag'],
  },
};
