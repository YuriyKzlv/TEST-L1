const { addNews } = require('./add-news.controller');
const { getAllNews } = require('./get-all-news.controller');
const { getById } = require('./get-by-id.controller');
const { deleteNews } = require('./delete-news.controller');

module.exports = {
  news: {
    addNews,
    getAllNews,
    getById,
    deleteNews,
  },
};
