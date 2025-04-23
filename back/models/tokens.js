const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {}

  Tokens.init({
    ownerId: DataTypes.INTEGER,
    token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tokens',
  });

  return Tokens;
};
