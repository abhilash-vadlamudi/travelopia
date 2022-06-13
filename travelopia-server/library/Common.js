'use strict'
var models = require('../models');
var request = require('request');
const { Op } = require('sequelize');
const mustache = require('mustache');
var nodemailer = require('nodemailer');
const mustacheView =  require('../templates/index');
var config = require('../config/config');

module.exports = {


    loadModel: (model) => {
        var classModel = require('../model/' + model)
        return new classModel();
    },
    loadController: (controller, isDir = false, isClass = true) => {
        let path = '../controller/' + controller;
        if(isDir) {
            path = path + '/' + controller;
        }
        var classController = require(path);
        return isClass ? new classController() : classController;
    },
    
    makeRequest: async (options) => {
        return new Promise((resolve, reject) => {
            request(options, (error, res, body) => {
                if (!error && res.statusCode === 200) {
                    resolve({
                        status: 'success',
                        body,
                        res
                    });
                } else {
                    reject({
                        status: 'error',
                        error,
                        res
                    });
                }
            })
        })
    },

    makeExternalRequest: async (options) => {
        return new Promise((resolve, reject) => {
            request(options, (error, res, body) => {
                if (!error) {
                    resolve({
                        success: true,
                        body,
                        statusCode: res.statusCode
                    });
                } else {
                    reject({
                        success: false,
                        error
                    });
                }
            })
        })
    },

    /**
     * Check user exist in database
     */
     checkUserExists: async function(email, mobile_num = null, login_type, excludeIds = []) {
        const userModel = this.loadModel('userdetails');
        const condition = {
            where: {
              [Op.or]: [{
                    '$Logins.email$': email
                }]
            }
        }
        if(mobile_num) {
            condition.where[Op.or].push({
                '$Logins.mobile_num$': mobile_num
            })
        }
        if(excludeIds.length > 0) {
            condition.where.id = {
                [Op.notIn]: excludeIds
            }
        }
        const existing = await userModel.find(condition);
        if(existing && existing.length > 0) {
            return true
        }
        return false;
    },
    randomStr: (m) => {
        var m = m || 9;
        var s = '',
            r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < m; i++) {
            s += r.charAt(Math.floor(Math.random() * r.length));
        }
        return s;
    },
    sprintf: require('locutus/php/strings/sprintf'),
    randomPassword: (digit) => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < digit; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },
    sendMail: async (mailOptions) => {
        let mailAuth = config.mail;

        mailOptions.from = mailOptions.from || config.fromEmails.default;
        mailOptions.to = mailOptions.to || mailAuth.auth.user;

        const renderedHtml =  mustache.render(mustacheView.mail, mailOptions);
        mailOptions.html =  renderedHtml;

        var transporter = nodemailer.createTransport(mailAuth);
        var status = await transporter.sendMail(mailOptions);

        return {
            success: status.rejected.length ? false : true,
            data: status,
            error: status.rejected
        }
    }
}