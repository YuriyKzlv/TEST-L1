const { News, Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async getAllNews(req, res) {
    try {
      const allNews = await News.findAll({
        include: [
          {
            model: Users,
            as: 'author',
            attributes: ['login', 'id'],
          },
        ],
      });
      return res
        .status(RESPONSE_STATUSES.OK)
        .send(allNews);
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERVAL_SERVER_ERROR)
        .send(error);
    }
  },
};
