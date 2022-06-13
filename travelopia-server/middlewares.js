
const jwt = require('jsonwebtoken');
const crypto = require('./library/Security');
const config = require('./config/config');
const acronym = require('./config/acronyms');
const lang = require('./config/lang');
const common = require('./library/Common');
const commonFunctions = require('./library/CommonFunctions');
const models = require('./models');


function authenticate(req, res, next) {
  try {
    let { origin, host } = req.headers;
    //default userId = 0
    const { userid: userId = 'ad50e8a5346179c8f777d352a6fe825d', authorization = '', application='' } = req.headers;

    if(req.method === "OPTIONS"){
      return res.status(200).json({});
    }

    let allow = false;
    origin = origin || '';
    host = host || '';

    config.allowedAdminOrigins.forEach(element => {
      if (origin.indexOf(element) !== -1)
        allow = true
      if (host.indexOf(element) !== -1)
        allow = true
    });

    if (!allow) {
      return res.status(200).json({ response_code: acronym.responseCode.FAILED, msg: lang.error.no_access })
    }

    const allowedRoutesWithoutAdmin = [
    ];

    const match = allowedRoutesWithoutAdmin.findIndex(item => req.baseUrl.includes(item));

    const decryptedUserId = crypto.decrypt(userId);
    req.headers.userId = decryptedUserId;
    req.headers.userType = '';
    req.headers.application = application

    // eslint-disable-next-line eqeqeq
    if (match != -1) {
      return next()
    }

    let token = authorization;
    [, token] = token.split(' ');

    jwt.verify(token, crypto.encrypt(global.SECRET + userId), async (error, decoded) => {
      if (error) {
        return res.status(200).json({ response_code: acronym.responseCode.FAILED, msg: lang.error.require.token_invalid_error, error });
      }
      req.user = decoded.split('-');
      const user = await common.loadModel(acronym.modelTypes.USERDETAILS).get(decryptedUserId);
      if (!user) {
        return res.status(200).json({ response_code: acronym.responseCode.FAILED, msg: lang.error.user_not_exist })
      }

      // eslint-disable-next-line eqeqeq
      if (user.Login.guid != crypto.decrypt(req.user[0])) {
        return res.status(200).json({ response_code: acronym.responseCode.FAILED, msg: lang.error.session_expired })
      }

      // eslint-disable-next-line eqeqeq
      if (crypto.decrypt(req.user[1]) != user.Login.email)
        return res.status(200).json({ response_code: acronym.responseCode.FAILED, msg: lang.error.require.token_invalid_error, error });

      // eslint-disable-next-line eqeqeq
      if (user.Login.status != 1) {
        return res.status(200).json({ response_code: acronym.responseCode.FAILED, msg: lang.error.account_blocked })
      }
  
      req.headers.userType = await commonFunctions.getConstantValue(acronym.cTypeDefName.USERTYPES, user.userType);

      return next();

    });


  } catch (err) {
    global.CONSOLE(err)
    return res.status(200).json({ response_code: acronym.responseCode.FAILED, msg: lang.error.require.token_invalid_error, error: err });
  }
}

// wrap controller function for transaction handling and try catch wrapping
const wrapControllerFunction = (callback, useTransaction = true) => async function(req, res) {
    function sendResponse({ success = true, responseStatus = acronym.responseStatus.SUCCESS, message = '', errorType = null, errorMessage = null, errorsArray = [], data = {} }) {
        res.status(responseStatus).json({
            success,
            message,
            error: success ? {} : {
                Type: errorType,
                message: errorMessage,
                errors: errorsArray
            },
            data
        });
    }

    try {
      const responseObj = req.method !== acronym.requestMethod.GET && useTransaction ?
         await models.sequelize.transaction(async t => {
          return await callback(req, res);
        })
        : await callback(req, res);
        sendResponse(responseObj);
    } catch(err) {
        global.CONSOLE(err)
        const responseObj = {
            success: false,
            responseStatus: acronym.responseStatus.INTERNALSERVERERROR,
            errorType: acronym.errorType.SERVERERROR,
            errorMessage: acronym.errorMessage.SERVERERRORMESSAGE,
            errorsArray: []
        }
        sendResponse(responseObj);
    }   
};

const validate = (schema, property = acronym.requestProperty.BODY) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (!error) { next(); }
    else {
      const { details } = error;
      const message = details.map(i => i.message).join(',')

      res.status(acronym.responseStatus.VALIDATIONERROR).json({
        success: false,
        error: {
          Type: acronym.errorType.VALIDATIONERROR,
          message,
          errors: details
        },
        data: {}
      });
    }
  }
}

module.exports = {
  authenticate, wrapControllerFunction, validate
}