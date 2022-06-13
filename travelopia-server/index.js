/* eslint-disable no-console */

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const config = require('./config/config');


//Route middlewares
const middlewares = require('./middlewares');

//Routes
const routes = require('./routes/index');
const admin = require('./routes/admin/api');
const loginRoutes = require('./routes/login/api');

//TimeZone to London
process.env.TZ = 'Asia/Kolkata';

global.getCTypes = require('./config/constants');
global.APPROOT = path.resolve(__dirname).replace('/public', '/').replace('\public', '\\');
global.SECRET = "engDBAUuGe9THDRNjs7cYckS2yul9lc8926";
global.port = config.portNumber || '4003';
global.CONSOLE = (err) => { console.log(err); }

const app = express();

app.set('port', global.port);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, userId, authorization, application');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setTimeout(500000);
  req.setTimeout(500000)
  // Pass to next layer of middleware
  next();
});

app.use('/', routes);
app.use('/travelopia/', loginRoutes);
app.use('/admin/*', middlewares.authenticate);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (_req, res) { res.status(404).sendFile(path.join(__dirname, 'public/error404.html')); });


/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(global.port, function () {
  console.log(`API running now on localhost: ${global.port}`);
  console.log("--------------------------------" + process.env.NODE_ENV + "---------------");
});



