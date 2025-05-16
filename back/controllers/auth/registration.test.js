/* eslint-disable no-undef */
jest.mock('../../constants', () => ({
  RESPONSE_STATUSES: {
    OK: 200,
    BAD_REQUEST: 400,
    CONFLICT: 409,
    INTERVAL_SERVER_ERROR: 500,
  },
}));

const mockReturnUserWithUpdatedToken = jest.fn();
jest.mock(
  './returnUserWithUpdatedToken.js',
  () => ({ returnUserWithUpdatedToken: mockReturnUserWithUpdatedToken }),
);

const mockFindOne = jest.fn();
const mockCreate = jest.fn();
jest.mock('../../models/', () => ({
  Users: { findOne: mockFindOne, create: mockCreate },
}));

const { registration } = require('./registration');

const makeRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('auth-controller__registration', () => {
  const baseBody = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    login: 'ivaniv',
    password: '123456',
    email: 'ivaniv@mail.com',
  };

  afterEach(jest.clearAllMocks);

  test('400 if missing data', async () => {
    const req = { body: { ...baseBody, login: '   ' } };
    const res = makeRes();

    await registration(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'MISSING_DATA' });
    expect(mockFindOne).not.toHaveBeenCalled();
  });
});
