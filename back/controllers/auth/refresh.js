const jwt = require('jsonwebtoken');

const { Users, Tokens } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');
const { returnUserWithUpdatedToken } = require('./returnUserWithUpdatedToken');

module.exports = {
  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res
          .status(RESPONSE_STATUSES.UNAUTHORIZED)
          .send('USER_NOT_AUTHENTICATED');
      }
      const authentication = await Tokens.findOne({ where: { token: refreshToken } });
      if (!authentication) {
        return res
          .status(RESPONSE_STATUSES.UNAUTHORIZED)
          .send('USER_NOT_AUTHENTICATED');
      }
      const verify = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY);
      const user = await Users.findOne({ where: { id: verify.userId } });

      if (verify && user) {
        return returnUserWithUpdatedToken(
          res,
          {
            user,
            oldToken: refreshToken,
            tokenAction: 'update',
          },
        );
      }
      return res
        .status(RESPONSE_STATUSES.UNAUTHORIZED)
        .send('AUTHORIZATION_ERROR');
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.UNAUTHORIZED)
        .send('AUTHORIZATION_ERROR');
    }
  },
};
