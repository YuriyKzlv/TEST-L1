const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

const { Users } = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_ACCESS_KEY,
};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await Users.findByPk(payload.userId);
        if (user) {
          done(null, user);
        } else {
          done(null, user);
        }
      } catch (error) {
        done(error, false);
      }
    }),
  );
};
