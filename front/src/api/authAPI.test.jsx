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

describe('authAPI__requests', () => {
  test('login with valid credentials should return token and call POST /api/auth/login', async () => {
    mockPost.mockResolvedValueOnce(makeResponse({ token: 'secret' }));

    const body = { login: 'user', password: 'secret' };
    const result = await authAPI.login(body);

    expect(mockPost).toHaveBeenCalledWith('/api/auth/login', body);
    expect(result).toEqual({ token: 'secret' });
  });

  test('refresh should return new token and call POST /api/auth/refresh', async () => {
    mockPost.mockResolvedValueOnce(makeResponse({ newToken: 'refreshSecret' }));

    const result = await authAPI.refresh();

    expect(mockPost).toHaveBeenCalledWith('/api/auth/refresh');
    expect(result).toEqual({ newToken: 'refreshSecret' });
  });

  test('registration with FormData avatar should send multipart POST /api/auth/registration', async () => {
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

  test('registrationGoogle should redirect to <BASE_URL>/api/auth/google', async () => {
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

  test('logout should call POST /api/auth/logout and return full response', async () => {
    const fullResponse = { status: 200, data: { ok: true } };
    mockPost.mockResolvedValueOnce(fullResponse);

    const result = await authAPI.logout();
    expect(mockPost).toHaveBeenCalledWith('/api/auth/logout');
    expect(result).toBe(fullResponse);
  });

  test('whoAmI should GET /api/auth/whoami and return user data', async () => {
    const userData = { id: 7, login: 'me' };
    mockGet.mockResolvedValueOnce(makeResponse(userData));

    const result = await authAPI.whoAmI();
    expect(mockGet).toHaveBeenCalledWith('/api/auth/whoami');
    expect(result).toEqual(userData);
  });
});
