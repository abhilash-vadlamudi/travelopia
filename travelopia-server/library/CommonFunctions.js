const models = require('../models');
const common = require('./Common');
const lang = require('../config/lang');
const config = require('../config/config');

module.exports = {

  /**
   * revert constant objects and return
   */
  async getConstantValue(group_name, local_id) {
    const cTypes = await global.getCTypes;
    for(const key in cTypes) {
      if(key === group_name) {
        for(const innerKey in cTypes[key]) {
          if(cTypes[key][innerKey] == local_id) {
            return innerKey; 
          }
        }
      }
    }
    return null;
  },

  /**
   * Get all constants within a group
   * @param {*} group_name 
   */
  async getGroupConstants(group_name) {
    const constantsArr = [];
    const cTypes = await global.getCTypes;
    for(let key in cTypes) {
      if(key === group_name) {
        for(let innerKey in cTypes[key]) {
          constantsArr.push(innerKey);
        }
      }
    }
    return constantsArr;
  }

}



  