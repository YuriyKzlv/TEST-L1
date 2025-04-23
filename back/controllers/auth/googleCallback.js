const jwt = require('jsonwebtoken');

const { RESPONSE_STATUSES } = require('../../constants');
const { Tokens } = require('../../models');

module.exports = {
  async googleCallback(req, res) {
    try {
      const token = jwt.sign(
        { userId: req.user.id },
        process.env.SECRET_REFRESH_KEY,
        { expiresIn: '31d' },
      );
      await Tokens.create({
        token,
        ownerId: req.user.id,
      });
      return res
        .cookie(
          'refreshToken',
          token,
          { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true },
        )
        .redirect(`${process.env.ORIGIN_FOR_CORS}/`);
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERVAL_SERVER_ERROR)
        .send({ message: 'ERROR_TRY_LATER' });
    }
  },
};
