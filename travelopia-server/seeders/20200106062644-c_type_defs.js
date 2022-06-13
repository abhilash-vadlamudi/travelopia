
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
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true, transaction});
      await queryInterface.bulkDelete('c_type_defs', null, { truncate: true });
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {raw: true, transaction});
      await queryInterface.bulkInsert('c_type_defs', [
        {
          "id": "1",
          "name": "user_types",
          "desc": "User Types",
          "is_deleted": "0",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "id": "2",
          "name": "countries",
          "desc": "Countries",
          "is_deleted": "0",
          "createdAt": new Date(),
          "updatedAt": new Date()
        }
      ], {});
    });
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('c_type_defs', null, { truncate: true });
  }
};
