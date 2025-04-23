import instance from './instance';

const usersAPI = {
  getUserById: async (id) => {
    const response = await instance.get(`/api/users/${id}`);
    return response.data;
  },
  editUser: async (formData) => {
    const response = await instance.put(
      '/api/users/',
      formData,
      {
        headers: { 'content-type': 'multypart/form-data' },
      },
    );
    return response.data;
  },
};

export default usersAPI;
