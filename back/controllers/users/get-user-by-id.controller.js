const _ = require('lodash');

const { Users } = require('../../models');

const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async getById(req, res) {
    try {
      const user = await Users.findByPk(req.params.id, { include: 'news' });
      if (!user) {
        return res
          .status(RESPONSE_STATUSES.NOT_FOUND)
          .send({
            message: 'User Not Found',
          });
      }
      return res
        .status(RESPONSE_STATUSES.OK)
        .send(_.pick(
          user,
          [
            'id',
            'login',
            'email',
            'firstName',
            'lastName',
            'avatar',
            'news',
          ],
        ));
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERVAL_SERVER_ERROR)
        .send(error);
    }
  },
};
