const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');
const { returnUserWithUpdatedToken } = require('./returnUserWithUpdatedToken');

module.exports = {
  async login(req, res) {
    try {
      const {
        body: {
          login,
          password,
        },
      } = req;
      if (!(login.trim() && password.trim())) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send('MISSING_PASSWORD_OR_LOGIN');
      }
      const user = await Users.findOne({ where: { login } });
      if (!user) {
        return res
          .status(RESPONSE_STATUSES.CONFLICT)
          .send({ message: 'ERROR, USER_NOT_FOUND' });
      }

      const isCorrectPassword = await user.comparePassword(password);
      if (!isCorrectPassword) {
        return res
          .status(RESPONSE_STATUSES.CONFLICT)
          .send({ message: 'WRONG_PASSWORD' });
      }

      return returnUserWithUpdatedToken(
        res,
        {
          user,
          tokenAction: 'create',
        },
      );
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERVAL_SERVER_ERROR)
        .send({ message: 'ERROR_TRY_LATER' });
    }
  },
};
