const { getById } = require('./get-user-by-id.controller');
const { editUser } = require('./edit-user.controller');

module.exports = {
  users: {
    getById,
    editUser,
  },
};
