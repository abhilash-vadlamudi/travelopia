const config = require('./config');
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'test';
module.exports = {
    [env]: config['sql']
}