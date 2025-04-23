const { Op } = require('sequelize');

const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');
const {
  returnUserWithUpdatedToken,
} = require('./returnUserWithUpdatedToken');

module.exports = {
  async registration(req, res) {
    try {
      const {
        body: {
          firstName,
          lastName,
          login,
          password,
          email,
        },
      } = req;

      if (!(
        login.trim()
        && password.trim()
        && firstName.trim()
        && lastName.trim())
        && email.trim()
      ) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'MISSING_DATA' });
      }

      const findUser = await Users.findOne({
        where: {
          [Op.or]: [{ login }, { email }],
        },
      });

      if (findUser) {
        return res
          .status(RESPONSE_STATUSES.CONFLICT)
          .send({ message: 'USER_ALREADY_EXISTS' });
      }

      let avatar = null;
      if (req.file) {
        avatar = req.file.path;
      }

      const user = await Users.create({
        firstName,
        lastName,
        login,
        password,
        avatar,
        email,
      });

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
        .send({ message: 'REGISTRATION_ERROR' });
    }
  },
};
