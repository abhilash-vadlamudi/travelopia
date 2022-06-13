const path = require('path');
module.exports = {
  "allowedAdminOrigins": [
    "localhost"
  ],

  "application_base_url": "http://localhost:4003/",

  "portNumber": 4003,

  "sql": {
    "username": "root",
    "password": "password",
    "database": "travelopia_dev",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
    "benchmark": true,
    "timezone": "+01:00"
  }, 

  "mail": {
    "host": "",
    "auth": {
      "user": "",
      "pass": ""
    },
    "maxConnections": 5,
    "maxMessages": 10,
    "port": 25,
    "secure": false
  },

  "fromEmails": {
    "default": "abhilash.vadlamudi@hotmail.com"
  },

  "timezone": "Asia/Kolkata"

}