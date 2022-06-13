
'use strict';
const crypto = require('../library/Security');
module.exports = (sequelize, DataTypes) => {
  const traveldetails = sequelize.define('travelDetails', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      get() { return this.getDataValue('lazyLoading') ? this.getDataValue('id') :
        crypto.encrypt(this.getDataValue('id')) }
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    countryId: {
      type: DataTypes.INTEGER,
      field: 'country'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'UserDetails',
        key: 'id'
      }
    },
    personsCount: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'persons_count'
    },
    budgetPerPerson: {
      allowNull: false,
      type: DataTypes.FLOAT,
      field: 'budget_per_person'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });
  traveldetails.associate = function(models) {
    // associations can be defined here
  };
  return traveldetails;
};