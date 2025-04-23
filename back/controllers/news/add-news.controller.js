const { News } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async addNews(req, res) {
    try {
      const {
        body: {
          title,
          text,
          tag,
        },
        user: { id },
      } = req;

      if (
        (title.trim() === '' || text.trim() === '')
      ) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ info: 'MISSING_DATA' });
      }

      let image = null;
      if (req.file) {
        image = req.file.path;
      }

      const news = await News.create({
        authorId: id,
        title,
        text,
        tag,
        image,
      });

      return res
        .status(RESPONSE_STATUSES.CREATE)
        .send(news);
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERVAL_SERVER_ERROR)
        .send(error);
    }
  },
};
