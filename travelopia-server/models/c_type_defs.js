'use strict';
module.exports = (sequelize, DataTypes) => {
  const c_type_defs = sequelize.define('c_type_defs', {
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN
  }, {});
  c_type_defs.associate = function(models) {
    // associations can be defined here
    models.c_type_defs.hasMany(models.c_types, {
      foreignKey: 'c_type_def_id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  };
  return c_type_defs;
};