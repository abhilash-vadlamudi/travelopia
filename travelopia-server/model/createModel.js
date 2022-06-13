const models = require('../models');
const common = require('../library/Common');
const lang = require('../config/lang');

/**
 * 
 * @param {Object} model to be created
 * @param {Boolean} hardDeleteFlag whether hard or soft delete
 * Create Model classes
 */
module.exports = (model, hardDeleteFlag = true) => {
  return class {
    /**
     * 
     * Initializations in the models constructor
     */
    constructor() {
      this.model = models[model];
      this.lang = lang;
      this.common = common;
    }

    /**
     * 
     * @param {Object} data to be inserted
     * Create records in the table
     */
    async create(data) {
      return await this.model.create(data);
    }

   /**
    * 
    * @param {Array} data to be inserted
    * Create array of records records in the table
    */
    async bulkCreate(data) {
      return await this.model.bulkCreate(data);
    }


    /**
     * 
     * @param {Object} data to be updated
     * @param {*} recordId 
     * Update records in the table
     */
    async update(recordId, data) {
      if (typeof recordId === 'string' || typeof recordId === 'number') {
        return await this.model.update(data, {
          where: {
            id: recordId
          }
        });
      } else {
        return await this.model.update(data, {
          where: recordId
        });
      }
    }

    /**
     * 
     * @param {Object} data to be updated
     * @param {*} recordId 
     * Update records in the table
     */
    async updateCondition(condition, data) {
      if (!condition.hasOwnProperty('where')) {
        condition = {
          where: condition
        }
      }
      return await this.model.update(data, condition);
    }

    /**
     * 
     * @param {*} recordId 
     * Update records in the table
     */
    async get(recordId) {
      if (typeof recordId === 'string' || typeof recordId === 'number') {
        return await this.model.findByPk(recordId);
      } else {
        return await this.model.findOne({
          where: recordId
        });
      }
    }

    /**
     * 
     * @param {Object} condition for getting total
     * Update records in the table
     */
    async find(condition) {
      if (!condition.hasOwnProperty('where')) {
        condition = {
          where: condition
        }
      }
      return await this.model.findAll(condition);
    }
    /**
     * 
     * @param {Object} condition for getting total
     * Update records in the table
     */
    async findAndCountAll(condition) {
      if (!condition.hasOwnProperty('where')) {
        condition = {
          where: condition
        }
      }
      return await this.model.findAndCountAll(condition);
    }

    /**
     * 
     * @param {Object} condition for getting total
     * Update records in the table
     */
    async getTotal(condition) {
      if (!condition.hasOwnProperty('where')) {
        condition = {
          where: condition
        }
      }
      return await this.model.count(condition);
    }

    /**
     * 
     * @param {Object} condition for getting total
     * Update records in the table
     */
    async findFirst(condition) {
      if (!condition.hasOwnProperty('where')) {
        condition = {
          where: condition
        }
      }
      return await this.model.findOne(condition);
    }

    /**
     * 
     * @param {Object} condition for getting total
     * findOrCreate records in the table
     */
    async findOrCreate(condition, branchRow) {
      let data;
      if (!condition.hasOwnProperty('where')) {
        condition = {
          where: condition
        }
      }
      data =  await this.model.findOne(condition);
      if (!data) {
        data = await this.model.create(branchRow);
      }
      return data
    }

    /**
     * Function to update or create the records in a table
     * @param {Object} condition 
     */
    async updateOrCreate(condition, data) {
      let record;
      if (!condition.hasOwnProperty('where')) {
        condition = {
          where: condition
        }
      }
      const row = await this.model.findOne(condition);
      if (!row) {
        record = await this.model.create(data);
      } else {
        await this.model.update(data, condition);
        record = await this.model.findOne(condition)
      }
      return record;
    }

    /**
     * 
     * @param {*} recordId to be updated
     * delete records in the table
     */
    async delete(recordId) {
      let condition = {
        where: recordId
      }
      if (typeof recordId === 'string' || typeof recordId === 'number') {
        condition = {
          where: {
            id: recordId
          }
        }
      }
      if (hardDeleteFlag) {
        return await this.model.destroy(condition);
      } else {

        return await this.model.update({
          is_deleted: 1,
          deleted: new Date()
        }, {
         ...condition
        });
      }
    }
  }
}