import authAPI from './authAPI';
import instance from './instance';

jest.mock('./instance', () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

const mockPost = instance.post;
const mockGet = instance.get;

const makeResponse = (data = 'payload') => ({ data });

beforeEach(() => {
  jest.clearAllMocks();
});

describe('authenticationAPI', () => {
  test('send POST login with data and return data', async () => {
    mockPost.mockResolvedValueOnce(makeResponse({ token: 'secret' }));

    const body = { login: 'user', password: 'secret' };
    const result = await authAPI.login(body);

    expect(mockPost).toHaveBeenCalledWith('/api/auth/login', body);
    expect(result).toEqual({ token: 'secret' });
  });

  test('refresh token', async () => {
    mockPost.mockResolvedValueOnce(makeResponse({ newToken: 'refreshSecret' }));

    const result = await authAPI.refresh();

    expect(mockPost).toHaveBeenCalledWith('/api/auth/refresh');
    expect(result).toEqual({ newToken: 'refreshSecret' });
  });

  test('create user', async () => {
    mockPost.mockResolvedValueOnce(makeResponse({ ok: true }));

    const formData = new FormData();
    formData.append('avatar', new Blob(['img']));
    await authAPI.registration(formData);

    expect(mockPost).toHaveBeenCalledWith(
      '/api/auth/registration',
      formData,
      { headers: { 'content-type': 'multypart/form-data' } },
    );
  });

  test('registration with Google, check url', async () => {
    const { location } = window;
    let mockHref = '';
    delete window.location;
    window.location = {
      get href() { return mockHref; },
      set href(value) { mockHref = value; },
    };

    process.env.REACT_APP_BASE_URL = 'https://testUrl.ru';
    authAPI.registrationGoogle();
    expect(window.location.href).toBe('https://testUrl.ru/api/auth/google');
    window.location = location;
  });

  test('logout user and return response', async () => {
    const fullResponse = { status: 200, data: { ok: true } };
    mockPost.mockResolvedValueOnce(fullResponse);

    const result = await authAPI.logout();
    expect(mockPost).toHaveBeenCalledWith('/api/auth/logout');
    expect(result).toBe(fullResponse);
  });

  test('check user', async () => {
    mockGet.mockResolvedValueOnce(makeResponse({ id: 7, login: 'me' }));
    const result = await authAPI.whoAmI();
    expect(mockGet).toHaveBeenCalledWith('/api/auth/whoami');
    expect(result).toEqual({ id: 7, login: 'me' });
  });
});
