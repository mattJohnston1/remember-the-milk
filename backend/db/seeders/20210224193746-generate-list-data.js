'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Lists', [
      { name: "Work", userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: "Home", userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: "Workout", userId: 1, createdAt: new Date(), updatedAt: new Date() },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Lists', null, {});
  }
};
