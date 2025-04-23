const { News } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async deleteNews(req, res) {
    try {
      const check = await News.findByPk(req.params.id);
      if (!check) {
        return res
          .status(RESPONSE_STATUSES.NOT_FOUND)
          .send('NEWS_NOT_FOUND');
      }
      const deleteNews = News.destroy({ where: { id: req.params.id } });
      return res
        .status(RESPONSE_STATUSES.OK)
        .send(deleteNews);
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERVAL_SERVER_ERROR)
        .send(error);
    }
  },
};
