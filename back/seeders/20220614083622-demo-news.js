const { Op } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('News', [{
      id: 1,
      authorId: 1,
      title: 'title',
      text: 'tloremmmmmmmm 1111111',
      tag: 'первыйТэг',
      image: 'imagesimages',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      authorId: 2,
      title: 'title',
      text: 'tloremmmmmmmm 22222222222',
      tag: 'второйТэг итсРилиГуд',
      image: 'imagesimages',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 3,
      authorId: 1,
      title: 'title',
      text: 'tloremmmmmmmm 3333333333',
      tag: 'teg1',
      image: 'imagesimages',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 4,
      authorId: 5,
      title: 'title',
      text: 'lorem ipsem set ament44444444',
      tag: 'тег1',
      image: 'imagesimages',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 5,
      authorId: 1,
      title: 'title',
      text: 'What is this? 555555555',
      tag: 'teg1',
      image: 'imagesimages',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('News', {
      id: {
        [Op.in]: [1, 2, 3, 4, 5],
      },
    });
  },
};
