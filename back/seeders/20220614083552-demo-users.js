const { Op } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      login: 'Marina',
      email: 'test@mail.net',
      password: 'Diahdmsnau30$',
      firstName: 'Tester',
      lastName: 'Li',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Lion',
      email: 'dmitry@gmail.net',
      password: 'oqwehcYG234',
      firstName: 'Dmitry',
      lastName: 'Podkuyko',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'dart wader',
      email: 'katya@yandex.net',
      password: 'Katerin432*!',
      firstName: 'John',
      lastName: 'John',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'teches',
      email: 'andrei@mail.com',
      password: 'Arndey82/a',
      firstName: 'Andrei',
      lastName: 'Mejonyy',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Pudge',
      email: 'svetlana@gmail.com',
      password: 'Svet0981(/2',
      firstName: 'Svetlana',
      lastName: 'Kozlova',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'IO',
      email: 'pavel@mail.net',
      password: 'pAsh89%2D',
      firstName: 'Pavel',
      lastName: 'Budkov',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Igor`',
      email: 'marisha@mail.ru',
      password: 'marishA90234',
      firstName: 'Marina',
      lastName: 'Kravec',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'phoenix',
      email: 'lina@gmail.net',
      password: 'loewqNJ1999&',
      firstName: 'Lina',
      lastName: 'Maiden',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('News', {
      email: {
        [Op.in]: [
          'lina@gmail.net',
          'marisha@mail.ru',
          'pavel@mail.net',
          'svetlana@gmail.com',
          'andrei@mail.com',
          'katya@yandex.net',
          'dmitry@gmail.net',
          'test@mail.net',
        ],
      },
    });
  },
};
