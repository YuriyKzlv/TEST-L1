const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { Users } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await Users.findOne({ where: { googleId: profile.id } });
          if (user) {
            done(null, user);
          } else {
            user = Users.create({
              googleId: profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              login: profile.emails[0].value,
              email: profile.emails[0].value,
            });
            done(null, user);
          }
        } catch (error) {
          done(error, false);
        }
      },
    ),
  );
};
