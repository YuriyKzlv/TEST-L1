/* eslint-disable no-undef */
const { RESPONSE_STATUSES } = require('../../constants');

const mockFindAll = jest.fn();
const UsersMock = {};

jest.mock('../../models', () => ({
  News: { findAll: mockFindAll },
  Users: UsersMock,
}));

const { getAllNews } = require('./get-all-news.controller');

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('news-controller__getAllNews', () => {
  afterEach(jest.clearAllMocks);

  test('success and return all news', async () => {
    const fakeNews = [{ id: 1 }, { id: 2 }];
    mockFindAll.mockResolvedValue(fakeNews);

    const req = {};
    const res = createRes();

    await getAllNews(req, res);

    expect(mockFindAll).toHaveBeenCalledWith({
      include: [
        {
          model: UsersMock,
          as: 'author',
          attributes: ['login', 'id'],
        },
      ],
    });
    expect(res.status).toHaveBeenCalledWith(RESPONSE_STATUSES.OK);
    expect(res.send).toHaveBeenCalledWith(fakeNews);
  });

  test('if DB error return 500', async () => {
    const error = new Error('DB fail');
    mockFindAll.mockRejectedValue(error);

    const req = {};
    const res = createRes();

    await getAllNews(req, res);

    expect(res.status).toHaveBeenCalledWith(
      RESPONSE_STATUSES.INTERVAL_SERVER_ERROR,
    );
    expect(res.send).toHaveBeenCalledWith(error);
  });
});
