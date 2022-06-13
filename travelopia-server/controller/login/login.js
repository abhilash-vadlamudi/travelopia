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

const login = {

  /**
   * Common login implemented for user and vendor
   * @param {Object} req 
   * @param {Object} res 
   */
  async login(req, res) {

    const cTypes = await global.getCTypes;
    const requiredFields = {
      username: lang.error.require.username_invalid,
      password: common.sprintf(lang.error.require.invalid, 'Password')
    }
    const error = this._validateInformation(req, requiredFields);

    if (error.length === 0) {
      const { username, password } = req.body;
      const encryptedPassword = crypto.encrypt(password);

      const loginModel = common.loadModel('logins');

      const condition = {
        [Op.or]: [{
          email: username
        }, {
          mobile_num: username
        }]
      }
      const loginRow = await loginModel.find(condition);

      if (loginRow.length > 0) {

        const { dataValues: userLoginRow } = loginRow[0];
        if(userLoginRow.password) {
          if (userLoginRow.password === encryptedPassword) {

            const userRecord = await this._getUserDetailsByLoginId(userLoginRow.id);

            const { dataValues: user } = userRecord[0];
            const encryptedUserId = crypto.encrypt(user.id.toString());


            const loginUpdateObject = {
              current_login_time: new Date(),
              last_login_time: userLoginRow.current_login_time,
              failed_count: 0
            }

            await loginModel.update(userLoginRow.id, loginUpdateObject);

            const data = await this._getUserData(userLoginRow, user, cTypes); 
            return this._sendResponse({ response: res, responseCode: 'success', data });
            
          } else {
            if (parseInt(userLoginRow.failed_count) < 3) {
              const failed_count = parseInt(userLoginRow.failed_count) + 1;
              const failedUpdateData = { failed_count };
              await loginModel.update(userLoginRow.id, failedUpdateData);
              return this._sendResponse({ response: res, message: lang.error.require.wrong_password, errorMessage: lang.error.require.wrong_password });
            } else {
              return this._sendResponse({ response: res, message: lang.error.require.locked, errorMessage: lang.error.require.locked });
            }
          }
        } else {
          return this._sendResponse({ response: res, message: lang.error.require.invalid_creditional, errorMessage: lang.error.require.invalid_creditional });
        }
      } else {
        return this._sendResponse({ response: res, message: lang.error.require.invalid_creditional, errorMessage: lang.error.require.invalid_creditional });
      }

    } else {
      return this._sendResponse({ response: res, message: error.join('|'), errorMessage: error.join('|') });
    }

  },

  /**
   * Get details based on login id
   * @private
   * @param {Number} loginId 
   * @param {String} loginType 
   */
  async _getUserDetailsByLoginId(loginId) {
    const modelRef = common.loadModel('userdetails');
    const condition = {
      loginId
    }
    return await modelRef.find(condition);
  },

  /**
   * Signup vendor from portal
   * @param {Object} req 
   * @param {Object} res 
   */
  async signupVendor(req, res) {
    const cTypes = await global.getCTypes;
    const loginModel = common.loadModel(acronym.modelTypes.LOGINS);
    const userModel = common.loadModel(acronym.modelTypes.USERDETAILS);
    const password = crypto.encrypt(req.body.password);
    const { email, mobile_num=null, full_name=null } = req.body;
    let {first_name=null, last_name=null} = req.body
    if (full_name) {
      first_name = full_name.split(' ').slice(0, -1).join(' '); // returns "firstname"
      last_name = full_name.split(' ').slice(-1).join(' '); // returns "lastname"
    }
    
    const loginEntryRow = {
      guid: common.randomStr(20) + new Date().getTime(),
      email, mobile_num, password,
      status: 0,
      is_deleted: false
    }

    const loginRow = await loginModel.create(loginEntryRow);

    const userCreateRow = {
      first_name, last_name,
      userType: cTypes['user_types']['TRAVELLER'],
      loginId: loginRow.id
    }

    const userRow = await userModel.create(userCreateRow);

    const profileStatus = 1;
    const authtoken = jwt.sign(
      `${crypto.encrypt(loginRow.guid)}-${crypto.encrypt(email)}`,
      `${crypto.encrypt(global.SECRET + crypto.encrypt(userRow.id.toString()))}`
    );

    const loginUpdateObj = {
      status: 1,
      current_login_time: new Date()
    }
    await userModel.updateLoginDetail(loginRow.id, loginUpdateObj);

    return {
      success: true,
      message: lang.success.business_users_added,
      responseStatus: acronym.responseStatus.CREATED,
      data: { 
        authtoken,
        userType:cTypes['user_types']['TRAVELLER'],
        userDetails: {
          first_name, last_name, email, guid: loginRow.guid, mobile_num, status: loginUpdateObj.status,
          profileProgressStatus: profileStatus, is_tmppassword:false, paymentEnabled: false, createdAt: userRow.createdAt
        },
        userId: crypto.encrypt(userRow.id.toString()) }
    }
  },

  /**
   * Function to validate user information that is recieved from client
   * @private
   * @param {RequestObject} req 
   * @param {Object} requiredFields 
   * @param {String} key nested key one level 
   * @returns {Array} errMsg
   */
  _validateInformation(req, requiredFields, key = null) {
    let errMsg = [];
    const base = key != null ? req.body[key] : req.body;
    for (const field in requiredFields) {
      if (!base[field]) {
        errMsg.push(`${requiredFields[field]}`);
      }
    }
    return errMsg;
  },

  /**
   * Function to handle forgot password
   * @param {Object} req 
   * @param {Object} res 
   */
  async forgot(req, res) {

    try {
      const requiredFields = {
        email: common.sprintf(lang.error.require.invalid, 'Email'),
      }
      const errorMsg = this._validateInformation(req, requiredFields);
      if (errorMsg.length === 0) {
        const userModel = common.loadModel('userdetails');
        const { email } = req.body;
        const loginRow = await userModel.getByEmail(email);
        
        if (loginRow) {    
          const cTypes = await global.getCTypes;
              const password = common.randomPassword(8);
              const forgotPasswordObject = {
                password: crypto.encrypt(password),
                failed_count: 0,
              };

              await userModel.updateLoginDetail(loginRow.id, forgotPasswordObject);
  
              const mailOptions = {
                to: loginRow.email,
                subject: mailTemplates.forgotPassword.subject,
                html: common.sprintf(mailTemplates.forgotPassword.body, password)
              };
              
              common.sendMail(mailOptions);
                
              return this._sendResponse({
                response: res,
                responseCode: 'success',
                message: common.sprintf(lang.success.resetPassword, email)
              })
  
        } else {
          return this._sendResponse({ response: res, message: lang.error.email_not_exist });
        }


      } else {
        return this._sendResponse({ response: res, message: errorMsg.slice(0, -3) + '.' });
      }
    } catch (err) {
      global.CONSOLE(err);
      return this._sendResponse({ response: res, message: lang.error.require.default });
    }
  },

  /**
   * Function to get the user information and token
   * @param {Object} userLoginRow 
   * @param {Object} user 
   */
  async _getUserData(userLoginRow, user, cTypes) {
    const { first_name, last_name, userType: userTypeValue, createdAt, Login: login } = user;
    const { email, mobile_num, status, guid, last_login_time, login_type } = login;
    const encryptedUserId = crypto.encrypt(user.id);
    const encryptedUserGuid = crypto.encrypt(guid.toString());
   
    const authtoken = jwt.sign(`${encryptedUserGuid}-${crypto.encrypt(userLoginRow.email)}`, `${crypto.encrypt(global.SECRET + encryptedUserId)}`);

    return {
      authtoken,
      userId: encryptedUserId,
      userType:userTypeValue,
      userDetails: {
        first_name, last_name, email, guid, mobile_num, status,
         last_login_time, createdAt

      }
    }
  },

  /**
   * Function to sent the response back to client
   * @private
   * @param {Object} responseResult 
   */
  _sendResponse({ response, responseStatus = 200, responseCode = acronym.responseCode.FAILED, message = '', errorMessage = '', data = {} }) {
    response.status(responseStatus).json({
      response_code: responseCode,
      msg: message,
      err: errorMessage,
      data
    });
  },

};
module.exports.login = login;