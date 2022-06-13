/* eslint-disable no-sparse-arrays */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */


    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true, transaction });
      await queryInterface.bulkDelete('travelDetails', null, { truncate: true });
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true, transaction });
      await queryInterface.bulkInsert('travelDetails', [
        {
          "id": 1,
          "name": "Surya",
          "email": "surya@yopmail.com",
          "country": 1,
          "userId": 1,
          "persons_count": 4,
          "budget_per_person": 500,
          "createdAt": "2022-06-13 13:12:02",
          "updatedAt": "2022-06-13 13:12:02"
        }
      ], {});
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('travelDetails', null, { truncate: true });
  }
};
