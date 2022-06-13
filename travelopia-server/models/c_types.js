'use strict';
module.exports = (sequelize, DataTypes) => {
  const c_types = sequelize.define('c_types', {
    c_type_def_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'c_type_defs',
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    local_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    display_value: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN
  }, {});
  c_types.associate = function(models) {
    // associations can be defined here
    models.c_types.belongsTo(models.c_type_defs, {
      foreignKey: 'c_type_def_id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  };
  return c_types;
};