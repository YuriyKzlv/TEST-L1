const { Tokens } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res
          .status(RESPONSE_STATUSES.UNAUTHORIZED)
          .send('UNAUTHORIZED');
      }
      const check = await Tokens.findOne({ where: { token: refreshToken } });
      if (!check) {
        return res
          .status(RESPONSE_STATUSES.NOT_FOUND)
          .send('AUTHORIZATION_ERROR');
      }
      Tokens.destroy({ where: { token: refreshToken } });
      res.clearCookie('refreshToken');
      return res
        .status(RESPONSE_STATUSES.OK)
        .send('LOGOUT');
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERVAL_SERVER_ERROR)
        .send('ERROR-SERVER');
    }
  },
};
