
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Logins = sequelize.define('Logins', {
    guid: DataTypes.STRING,
    mobile_num: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER,
    verify_code: DataTypes.STRING,
    verify_expire: DataTypes.DATE,
    failed_count: DataTypes.INTEGER,
    last_login_time: DataTypes.DATE,
    current_login_time: DataTypes.DATE,
  }, { paranoid: true });
  Logins.associate = function(models) {
    // associations can be defined her

    models.Logins.hasOne(models.UserDetails, {
        foreignKey: 'loginId',
        onDelete: 'cascade',
        onUpdate: 'cascade',
    });
  };
  return Logins;
};