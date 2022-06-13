
'use strict';
const crypto = require('../library/Security');

module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define('UserDetails', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      get() { return this.getDataValue('lazyLoading') ? this.getDataValue('id') :
        crypto.encrypt(this.getDataValue('id')) }
    },
    loginId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Logins',
        key: 'id'
      },
      field: 'login_id',
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() { return `${this.getDataValue('first_name')} ${this.getDataValue('last_name')}`}
    },
    userType: {
      type: DataTypes.INTEGER,
      field: 'user_type'
    },
  }, { paranoid: true });
  UserDetails.associate = function(models) {
    // associations can be defined here

    models.UserDetails.belongsTo(models.Logins, {
        foreignKey: 'loginId',
        onDelete: 'cascade',
        onUpdate: 'cascade',
    });
  };
  return UserDetails;
};