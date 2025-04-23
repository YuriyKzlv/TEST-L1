import instance from './instance';

const newsAPI = {
  getNews: async () => {
    const response = await instance.get('/api/news');
    return response.data;
  },

  addNews: async (formData) => {
    const response = await instance.post(
      '/api/news',
      formData,
      {
        headers: { 'content-type': 'multypart/form-data' },
      },
    );
    return response.data;
  },
};

export default newsAPI;
