const { registration } = require('./registration');
const { login } = require('./login');
const { refresh } = require('./refresh');
const { logout } = require('./logout');
const { whoAmI } = require('./who-am-i');
const { googleCallback } = require('./googleCallback');

module.exports = {
  auth: {
    registration,
    login,
    refresh,
    logout,
    whoAmI,
    googleCallback,
  },
};
