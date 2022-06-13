'use strict';
const models = require('../models');
const common = require('../library/Common');
const lang = require('../config/lang');
const moment = require('moment');
const acronym = require('../config/acronyms');
const { Op } = require('sequelize');

class UserDetails {
    /**
     * Constructor for user model
     */
    constructor() {
        this.model              = models.UserDetails;
        this.includeLogin       = models.Logins;
        this.arguments = {}
    }

    /**
     * 
     * @param {Object} data 
     * @param {Object} dataDetails 
     * Create the vendor and the corresponding details in the database
     */
    async create(data){
        const user = await this.model.create(data);
        return user;
    }

    /**
     * 
     * @param {Object} data 
     * Create login details in the database
     */
    async createLoginDetail(data) {
        return await this.includeLogin.create(data);
    }

    /**
     * 
     * @param {Number|String} userId 
     * @param {Object} data 
     * update the vendor details by the vendor id
     */
    async update(userId, data) {
        return await this.model.update(data, {
            where: {
                id: userId
            }
        });
    }

    /**
     * 
     * @param {Number|String|Object} v 
     * @param {Object} data 
     * Update vendor details in the table
     */
    async updateLoginDetail(loginId, data) {
        let condition = loginId;
        if(typeof loginId === 'string' || typeof loginId === 'number') {
            condition = {
                id: loginId
            };
        }
        return await this.includeLogin.update(data, {
            where : condition
        });
    }

    /**
     * 
     * @param {Number|String} userId 
     * Get vendor data with all its details
     */
    async get(userId){
        // if(typeof userId === 'string' || typeof userId === 'number') {
        //     return await this.model.findByPk(userId);
        // } else {
            const condition = {
                id: userId
            };
            return await this.model.findOne({
                where : condition,
                include: [ { 
                    model: this.includeLogin 
                }]
            });
        // }
    }

     /**
     * 
     * @param {Number|String} userId 
     * Get vendor data with all its details
     */
    async getTenant(userId){
        if(typeof userId === 'string' || typeof userId === 'number') {
            return await this.model.findByPk(userId, {
                include: [{ 
                    model: this.include, 
                    as: 'UserDetails',
                    include: [{
                        model: this.mangopayModel
                    }]
                }, { 
                    model: this.includeLogin 
                }, {
                  model: this.includeAddress,
                  as: 'Address'
                }]
            });
        } else {
            const condition = userId;
            return await this.model.findOne({
                where : condition, 
                include: [{ 
                    model: this.include, 
                    as: 'UserDetails',
                    include: [{
                        model: this.mangopayModel
                    }]
                }, { 
                    model: this.includeLogin 
                }, {
                  model: this.includeAddress,
                  as: 'Address'
                }]
            });
        }
    }

    /**
     * 
     * @param {Number|String} userId 
     * Get vendor data with all its details
     */
    async getVendor(userId){
        if(typeof userId === 'string' || typeof userId === 'number') {
            return await this.model.findByPk(userId);
        } else {
            const condition = userId;
            return await this.model.findOne({
                where : condition
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
            where: condition,
            include: [{ model: this.includeLogin }]
          }
        }
        return await this.model.findAll(condition);
    }

    /**
     * 
     * @param {Number|String} id 
     * Remove record according to Id
     */
    async delete(id, loginId) {

      await this.include.destroy({
        where: {
          userId: id
        }
      });
      await this.includeLogin.destroy({
        where: {
          id: loginId
        }
      });

      return await this.model.destroy({
        where: { id }
      });
    }

  async checkBusinesExists(businessName) {
    const data = await this.model.findOne({
      where: {
        business_name: businessName
      }
    });
    return data ? true : false;
  }

    /**
     * 
     * @param {String} email 
     * Get vendor and corresponding details by email
     */
    async getByEmail(email){
        return await this.includeLogin.findOne({ 
            where: { 
                '$Logins.email$': email.trim()
            }, 
            include: [{ model: this.model }]
        });
    }


}
module.exports = UserDetails