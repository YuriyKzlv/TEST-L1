const jwt = require('jsonwebtoken');

const { Users, Tokens } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async whoAmI(req, res) {
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
      const verify = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY);
      const user = await Users.findOne({ where: { id: verify.userId } });
      if (verify && user) {
        return res
          .status(RESPONSE_STATUSES.OK)
          .send(
            {
              user: {
                id: user.id,
                login: user.login,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                registrationDate: user.createdAt,
              },
            },
          );
      }
      return res
        .status(RESPONSE_STATUSES.UNAUTHORIZED)
        .send('AUTHORIZATION_ERROR');
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERVAL_SERVER_ERROR)
        .send({ message: 'ERROR_TRY_LATER' });
    }
  },
};
