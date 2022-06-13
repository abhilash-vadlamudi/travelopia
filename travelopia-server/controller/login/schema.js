const Joi = require("joi");

module.exports = {
    signupVendor: Joi.object().keys({
        first_name: Joi.string().optional(),
        last_name: Joi.string().optional(),
        email: Joi.string().email().required(),
        mobile_num: Joi.string().optional().min(10).max(10),
        terms: Joi.bool().optional(),
        password: Joi.string().required().pattern(/^(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/),
        full_name: Joi.string().optional()
    })
}