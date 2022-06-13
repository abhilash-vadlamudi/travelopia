  'use strict';

 const createModel = require('./createModel');
const models = require('../models');

 const cTypeDefs = createModel('c_type_defs', true);

 cTypeDefs.prototype.getGroupConstants = async function(groupName) {
     return await this.model.findOne({
         where: {
             name: groupName
         },
         include: [{
             model: models.c_types
         }]
     })
 }
 
 cTypeDefs.prototype.getCTypeDisplayValue = async function(groupName, constantValue) {
     const cTypeRow = await this.model.findOne({
         where: {
             name: groupName
         },
         include: [{
             model: models.c_types,
             where: {
                 local_id: constantValue
             }
         }]
     })
     return cTypeRow ? (cTypeRow['c_types'][0]['display_value'] || cTypeRow['c_types'][0]['name']) : null;
 }


 /**
  * Function to get the ctype based on the contant value and group name
  * @param {String} groupName 
  * @param {String|Number} constantValue 
  */
 cTypeDefs.prototype.getCType = async function(groupName, constantValue) {
  const cTypeRow = await this.model.findOne({
      where: {
          name: groupName
      },
      include: [{
          model: models.c_types,
          where: {
              local_id: constantValue
          }
      }]
  })
  return cTypeRow ? cTypeRow.c_types[0] : null;
}

 module.exports = cTypeDefs