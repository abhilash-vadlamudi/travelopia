/** Name the last child in CAPS to represent it as ENUM */
module.exports = {

  userType: {
    USER: 'U'
  },
  
  requestProperty: {
    BODY: 'body',
    QUERY: 'query',
    PARAMS: 'params'
  },

  requestMethod: {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
  },

  responseCode: {
    FAILED: 'failed',
    SUCCESS: 'success'
  },

  responseStatus: {
    SUCCESS: 200,
    CREATED: 201,
    UPDATEDORNOCONTENT: 204,
    BADREQUEST: 400,
    VALIDATIONERROR: 422,
    UNAUTHORIZED: 401,
    UNAUTHENTICATED: 403,
    NOTFOUND: 404,
    CONFLICT: 409,
    INTERNALSERVERERROR: 500,
    ACCESSDENIED: 700, 
  },

  errorType: {
    VALIDATIONERROR: 'Validation Error',
    SERVERERROR: 'Server Error',
    BADREQUEST: 'Bad Request',
    UNAUTHORIZED: 'Access denied'
  },

  errorMessage: {
    VALIDATIONERRORMESSAGE: 'One or more values passed is incorrect or missing',
    SERVERERRORMESSAGE: 'Server encountered an internal error, please try again',
    BADREQUESTMESSAGE: 'Invalid Request',
    UNAUTHORIZEDMESSAGE: 'Access is denied. You may not have the appropriate permissions to access the resource.'
  },

  userTypes: {
    TRAVELLER: 'TRAVELLER'
  },

  modelTypes: {
    LOGINS: 'logins',
    USERDETAILS: 'userdetails',
    CTYPES: 'ctypes',
    COUNTRIES: 'countries',
    TRAVELDETAILS: 'traveldetails'
  },

  cTypeName: {
    TRAVELLER: 'TRAVELLER',
    INDIA: 'INDIA',
    AFRICA: 'AFRICA',
    EUROPE: 'EUROPE'
  },

  cTypeDefName: {
    USERTYPES: 'user_types',
    COUNTRIES: 'countries'
  },

  eventconstant: {
    DEFAULTJOB: 'default',
    NOTIFICATIONQUEUE: 'notification',
    COMMONQUEUE: 'common'
  },

  dateFormat: {
    DATEFORMAT: 'DD/MM/YYYY',
    DATEFORMATSQL: 'YYYY-MM-DD',
    DATETIMEFORMAT: 'DD/MM/YYYY HH:mm',
    YEARMONTHDATEHOURMIN: 'YYYY/MM/DD HH:mm',
    YEARMONTHDATENODELIMITER: 'YYYYMMDD',
    DATEFORMATDATAFEED: 'YYYY-MM-DD HH:mm:ss',
    DATEFORMATDATAFEEDGENERATED: 'D-MMMM-YYYY HH:mm',
    AGREEMENTCREATED: 'Do MMMM YYYY',
    DATETIMEZONEFORMAT: 'Do MMMM YYYY HH:mm z'
  },

  application: {
    WEBAPP: 'webapp',
  },

  dataOption: {
    COUNT: 'count',
    SUM: 'sum',
    FIND: 'find',
    FINDANDCOUNT: 'findandcount'
  }
}