const passport = require('passport');
const { Router } = require('express');

const imagesMiddleware = require('../middleware/images');
const {
  login,
  registration,
  refresh,
  logout,
  whoAmI,
  googleCallback,
} = require('../controllers/auth').auth;

const router = Router();

router.post(
  '/registration',
  imagesMiddleware.single('file'),
  registration,
);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);
router.get('/whoami', whoAmI);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google'),
  googleCallback,
);

module.exports = router;
