'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      { userId: 1, listId: 2, text: "Math", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, listId: 2, text: "Science", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, listId: 2, text: "Social Studies", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, listId: 2, text: "Geology", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, listId: 3, text: "Jumping Jacks", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, listId: 3, text: "Push-Ups", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, listId: 3, text: "Sit-Ups", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, listId: 3, text: "Run", createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
