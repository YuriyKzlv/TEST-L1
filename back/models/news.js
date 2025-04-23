const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.Users, {
        foreignKey: 'authorId',
        as: 'author',
      });
    }
  }

  News.init({
    authorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    tag: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};
