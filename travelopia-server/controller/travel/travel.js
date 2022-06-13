'use strict';
const crypto = require('../../library/Security');
const lang = require('../../config/lang');
const common = require('../../library/Common');
const acronym = require('../../config/acronyms');
const jwt = require('jsonwebtoken');
const mailTemplates = require('../../config/mailTemplates');
const commonFunctions = require('../../library/CommonFunctions');
const _ = require('lodash')
const { Op } = require('sequelize');
const moment = require('moment');
const models = require('../../models');

const travel = {

    /**
   * Function to fetch property Add Categories
   * @private
   * @param {RequestObject} req 
   * @param {Object} requiredFields 
   * @param {String} key nested key one level 
   * @returns {Array} errMsg
   */
   async getCountry(req, res) {
      const {userId} = req.headers
      let countries = await common.loadModel(acronym.modelTypes.CTYPES).getGroupConstants(acronym.cTypeDefName.COUNTRIES);
      countries = countries.c_types.map((item) => {
        return {id: crypto.encrypt(item.local_id), name: item.display_value}
      })
      if (countries) {
        return {
          success: true,
          responseStatus: acronym.responseStatus.SUCCESS,
          data: countries
        }
      }

      return {
        success: true,
        responseStatus: acronym.responseStatus.NOTFOUND,
        data: []
      }

    },

  /**
   * Function to add property to cart
   * @private
   * @param {RequestObject} req 
   * @param {Object} requiredFields 
   * @param {String} key nested key one level 
   * @returns {Array} errMsg
   */
    async addTraveller(req,res) {
      const {userId} = req.headers;
      let {email=null, name=null, countryId=null,count=null,budget=null} = req.body;
      countryId = crypto.decrypt(countryId)
      
        const data = {
          email,
          name,
          userId,
          countryId,
          personsCount: count,
          budgetPerPerson: budget
        }

        const travller = await common.loadModel(acronym.modelTypes.TRAVELDETAILS).create(data)
        if (travller) {
          return {
            success: true,
            responseStatus: acronym.responseStatus.SUCCESS,
            data: [],
            message: lang.success.travelDetailsAdded
          }
        } else {
          return {
            success: false,
            responseStatus: acronym.responseStatus.INTERNALSERVERERROR,
            data: []
          }
        }

    },


  /**
   * Function to get user cart items
   * @private
   * @param {RequestObject} req 
   * @param {Object} requiredFields 
   * @param {String} key nested key one level 
   * @returns {Array} errMsg
   */
    async getTravelDetails(req,res) {
      const {userId} = req.headers

      let travelDetails = await common.loadModel(acronym.modelTypes.TRAVELDETAILS).find({
        where:{userId},
      })
      
      if (travelDetails) {
        for (let item of travelDetails) {
          item.dataValues.countryId = await common.loadModel(acronym.modelTypes.CTYPES).getCTypeDisplayValue(acronym.cTypeDefName.COUNTRIES, item.dataValues.countryId)
        }
        return {
          success: true,
          responseStatus: acronym.responseStatus.SUCCESS,
          data: travelDetails
        }
      } 
      return {
        success: false,
        responseStatus: acronym.responseStatus.INTERNALSERVERERROR,
        data: []
      }



    },

};
module.exports.travel = travel;