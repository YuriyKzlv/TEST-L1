/* eslint-disable no-undef */
const mockRouter = { get: jest.fn(), post: jest.fn(), delete: jest.fn() };
jest.mock('express', () => ({
  Router: jest.fn(() => mockRouter),
}));

const mockMwSingle = jest.fn(() => 'mockUploadMW');
jest.mock('../middleware/images', () => ({ single: mockMwSingle }));

const mockHandlers = {
  getAllNews: jest.fn(),
  getById: jest.fn(),
  addNews: jest.fn(),
  deleteNews: jest.fn(),
};

jest.mock('../controllers/news', () => ({ news: mockHandlers }));

require('./news');

describe('news__router', () => {
  test('send GET getAllNews', () => {
    expect(mockRouter.get).toHaveBeenCalledWith('/', mockHandlers.getAllNews);
  });

  test('send GET getById', () => {
    expect(mockRouter.get).toHaveBeenCalledWith('/:id', mockHandlers.getById);
  });

  test('send POST addNews', () => {
    expect(mockMwSingle).toHaveBeenCalledWith('file');

    expect(mockRouter.post)
      .toHaveBeenCalledWith('/', 'mockUploadMW', mockHandlers.addNews);
  });

  test('send DELETE deleteNews', () => {
    expect(mockRouter.delete)
      .toHaveBeenCalledWith('/:id', mockHandlers.deleteNews);
  });
});
