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
      await queryInterface.bulkDelete('Logins', null, { truncate: true });
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true, transaction });
      await queryInterface.bulkInsert('Logins', [
        {
          "guid": "nlVndC078qr697kBKaLZ1647935375543",
          "email": "travelopia_test@yopmail.com",
          "mobile_num": 8179677745,
          "password": "21225113ff2d1da11a643207ee011398",
          "status": 1,
          "verify_code": null,
          "verify_expire": null,
          "failed_count": 0,
          "last_login_time": "2022-06-13 13:12:02",
          "current_login_time": "2022-06-13 13:12:02",
          "createdAt": "2022-06-13 13:12:02",
          "updatedAt": "2022-06-13 13:12:02",
          "deletedAt": null
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
    return queryInterface.bulkDelete('Logins', null, { truncate: true });
  }
};
