/* eslint-disable no-useless-escape */

const acronym = require('../../config/acronyms.js');
const config = require('../../config/config');
const { assetPath } = config;

const loadRoutes = function (router) {

    const { wrapControllerFunction, validate } = require('../../middlewares.js')
    

    const travelController = require('../../controller/travel/travel').travel;
    router.get('/api/travel/country',wrapControllerFunction(travelController.getCountry.bind(travelController)));
    router.post('/api/travel/add',wrapControllerFunction(travelController.addTraveller.bind(travelController)));
    router.get('/api/travel/details',wrapControllerFunction(travelController.getTravelDetails.bind(travelController)));
}
module.exports.loadRoutes = loadRoutes;