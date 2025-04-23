const jwt = require('jsonwebtoken');

const { Tokens } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async returnUserWithUpdatedToken(response, { user, oldToken, tokenAction }) {
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.SECRET_ACCESS_KEY,
      { expiresIn: '40m' },
    );
    const token = jwt.sign(
      { userId: user.id },
      process.env.SECRET_REFRESH_KEY,
      { expiresIn: '31d' },
    );

    if (tokenAction === 'update') {
      await Tokens.update(
        { token },
        { where: { token: oldToken } },
      );
    } else if (tokenAction === 'create') {
      await Tokens.create({
        token,
        ownerId: user.id,
      });
    }

    return response
      .status(RESPONSE_STATUSES.OK)
      .cookie(
        'refreshToken',
        token,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true },
      )
      .send(
        {
          token: `Bearer ${accessToken}`,
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
  },
};
