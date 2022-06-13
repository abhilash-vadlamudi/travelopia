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
      await queryInterface.bulkDelete('c_types', null, { truncate: true });
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true, transaction });
      await queryInterface.bulkInsert('c_types', [
         {
          "c_type_def_id": "1",
          "name": "TRAVELLER",
          "local_id": "1",
          "order_id": "1",
          "display_value": null,
          "is_deleted": "0",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "c_type_def_id": "2",
          "name": "INDIA",
          "local_id": "1",
          "order_id": "1",
          "display_value": 'India',
          "is_deleted": "0",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "c_type_def_id": "2",
          "name": "AFRICA",
          "local_id": "2",
          "order_id": "2",
          "display_value": 'Africa',
          "is_deleted": "0",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "c_type_def_id": "2",
          "name": "EUROPE",
          "local_id": "3",
          "order_id": "3",
          "display_value": 'Europe',
          "is_deleted": "0",
          "createdAt": new Date(),
          "updatedAt": new Date()
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
    return queryInterface.bulkDelete('c_types', null, { truncate: true });
  }
};
