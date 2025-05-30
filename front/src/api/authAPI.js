import instance from './instance';

const authAPI = {
  login: async (data) => {
    const response = await instance.post('/api/auth/login', data);
    return response.data;
  },
  refresh: async () => {
    const response = await instance.post('/api/auth/refresh');
    return response.data;
  },
  registration: async (formData) => {
    const response = await instance.post(
      '/api/auth/registration',
      formData,
      {
        headers: { 'content-type': 'multypart/form-data' },
      },
    );
    return response.data;
  },
  registrationGoogle: async () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/api/auth/google`;
  },
  logout: async () => {
    const response = await instance.post('/api/auth/logout');
    return response;
  },
  whoAmI: async () => {
    const response = await instance.get('/api/auth/whoami');
    return response.data;
  },
};

export default authAPI;
