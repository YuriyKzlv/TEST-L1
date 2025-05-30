/* eslint-disable no-undef */
const { Op } = require('sequelize');

jest.mock('../../constants', () => ({
  RESPONSE_STATUSES: {
    OK: 200,
    BAD_REQUEST: 400,
    CONFLICT: 409,
    INTERVAL_SERVER_ERROR: 500,
  },
}));

const mockReturnUserWithUpdatedToken = jest.fn();
jest.mock('./returnUserWithUpdatedToken.js', () => ({
  returnUserWithUpdatedToken: mockReturnUserWithUpdatedToken,
}));

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

const baseBody = {
  firstName: 'Ivan',
  lastName: 'Ivanov',
  login: 'ivanov',
  password: '123456',
  email: 'ivaniv@mail.com',
};

describe('registration__auth-controller', () => {
  afterEach(jest.clearAllMocks);

  test('missing data, should respond 400 and skip DB lookup', async () => {
    const req = { body: { ...baseBody, login: '   ' } };
    const res = makeRes();

    await registration(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'MISSING_DATA' });
    expect(mockFindOne).not.toHaveBeenCalled();
  });

  test('existing user, should respond 409 and not create', async () => {
    const req = { body: baseBody };
    const res = makeRes();

    mockFindOne.mockResolvedValue({ id: 1 });

    await registration(req, res);

    expect(mockFindOne).toHaveBeenCalledWith({
      where: { [Op.or]: [{ login: baseBody.login }, { email: baseBody.email }] },
    });
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({ message: 'USER_ALREADY_EXISTS' });
    expect(mockCreate).not.toHaveBeenCalled();
    expect(mockReturnUserWithUpdatedToken).not.toHaveBeenCalled();
  });

  test('DB error on create, should respond 500', async () => {
    const req = { body: baseBody };
    const res = makeRes();

    mockFindOne.mockResolvedValue(null);
    mockCreate.mockRejectedValue(new Error('DB failure'));

    await registration(req, res);

    expect(mockFindOne).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'REGISTRATION_ERROR' });
    expect(mockReturnUserWithUpdatedToken).not.toHaveBeenCalled();
  });
});
