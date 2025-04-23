const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

require('./middleware/passport')(passport);
require('./middleware/google')(passport);

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const newsRouter = require('./routes/news');
const usersRouter = require('./routes/users');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({
  origin: process.env.ORIGIN_FOR_CORS,
  credentials: true,
  optionSuccessStatus: 200,
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: process.env.SECRET_ACCESS_KEY }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname));
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use(
  '/api/news',
  passport.authenticate('jwt', { session: false }),
  newsRouter,
);
app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRouter,
);
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
