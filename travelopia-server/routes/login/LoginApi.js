/* eslint-disable no-useless-escape */

const loadRoutes = function (router) {
    const loginController = require('../../controller/login/login').login;
    const loginSchema = require('../../controller/login/schema');
    const { wrapControllerFunction, validate } = require('../../middlewares'); 
    
    router.post('/login',loginController.login.bind(loginController));
    router.post('/forgot',loginController.forgot.bind(loginController));
    router.post('/signup',validate(loginSchema.signupVendor), wrapControllerFunction(loginController.signupVendor.bind(loginController)));
}
module.exports.loadRoutes = loadRoutes;