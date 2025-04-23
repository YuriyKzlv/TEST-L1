const fs = require('fs');
const _ = require('lodash');

const { Users } = require('../../models');

const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async editUser(req, res) {
    try {
      const {
        body,
        file,
        user: {
          dataValues: { id },
        },
      } = req;

      const user = await Users.findByPk(id);
      if (!user) {
        return res
          .status(RESPONSE_STATUSES.NOT_FOUND)
          .send({
            message: 'User Not Found',
          });
      }

      const selectedData = _.pick(
        body,
        [
          'login',
          'email',
          'firstName',
          'lastName',
        ],
      );

      if (file && user.avatar !== null) {
        fs.unlink(`./${user.avatar}`, (err) => {
          if (err) throw err;
        });
        selectedData.avatar = file.path;
      }

      const updateValues = _.omitBy(selectedData, (value) => value.trim() === '');
      const validEmail = updateValues.email !== undefined && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(updateValues.email);

      if (
        Object.values(updateValues).length === 0
        || !validEmail
      ) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({
            message: 'MISSING_DATA',
          });
      }

      await Users.update(
        updateValues,
        { where: { id } },
      );

      return res
        .status(RESPONSE_STATUSES.OK)
        .send({
          data: updateValues,
        });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERVAL_SERVER_ERROR)
        .send(error);
    }
  },
};
