const Joi = require('joi');

module.exports = Joi.object({
  toUser: Joi.string().required().messages({
    "string.base": `toUser should be string`,
    "string.empty": `toUser cannot be an empty field`,
    "any.required": `toUser is a required field`,
  }),
  isFollow: Joi.string().required().messages({
    "string.base": `isFollow should be string`,
    "string.empty": `isFollow cannot be an empty field`,
    "any.required": `isFollow is a required field`,
  }),

})