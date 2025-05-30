const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.News, {
        foreignKey: 'authorId',
        as: 'news',
      });
      Users.hasMany(models.Tokens, {
        foreignKey: 'ownerId',
        as: 'tokens',
      });
    }
  }

  Users.init({
    login: DataTypes.STRING,
    email: DataTypes.STRING,
    googleId: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
    hooks: {
      beforeCreate: (user) => {
        if (user.password) {
          const linkUser = user;
          linkUser.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null,
          );
        }
      },
    },
  });

  Users.prototype.comparePassword = function compare(password) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
          return rej(err);
        }
        return res(isMatch);
      });
    });
  };

  return Users;
};
