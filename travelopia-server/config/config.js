
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'test';
module.exports = require(`../config/${env}.js`);