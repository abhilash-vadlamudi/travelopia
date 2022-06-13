
[![N|Solid](https://www.drupal.org/files/styles/grid-4-2x/public/travelopia_logo.png?itok=ljzwrdLC)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=main)](https://github.com/abhilash-vadlamudi/travelopia)

Angular-powered with NodeJs backend

## Tech
- [Angular](https://angular.io/)
- [NodeJs](https://nodejs.org/en/)    : min 8 max 10
- [MySQL](https://www.mysql.com/)     : Min MySQL version 5.5.60
- [PM2](https://pm2.keymetrics.io/)       : Global package
- [Sequelize](https://sequelize.org/master/) : Global package

## Installation
Install the dependencies and devDependencies and start the server.

Global Packages
```sh
npm i pm2 -g
npm install -g node-gyp
npm install -g sequelize-cli
```
First Clone git repo
```sh
git clone git@github.com:abhilash-vadlamudi/travelopia.git
```
Then
```sh
cd travelopia
```
To Start the server first create an empty db schema with name travelopia_dev and then
```sh
cd travelopia-server
npm i
sequelize --migrations-path=migrations db:migrate
sequelize db:seed:all
pm2 start ecosystem.config.js --env test --node-args="--inspect-brk" --watch
```
To start the web app
```sh
cd ../travelopia-portal/
export NODE_OPTIONS=--max_old_space_size=4096
ng serve
```
Navigate to
```sh
http://localhost:4200/
```

To Test the flow for different users
1. For user Surya login with
   - email: travelopia_test@yopmail.com
   - password: Test@123
   - Navigate to Publish Details
   - Add required data
   - Navigate to view details in app header
   - The previous input data should be visible here
   

