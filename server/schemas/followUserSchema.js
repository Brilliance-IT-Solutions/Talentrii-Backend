const Joi = require('joi');

module.exports = Joi.object({
  toUser: Joi.string().required().messages({
    "string.base": `toUser should be string`,
    "string.empty": `toUser cannot be an empty field`,
    "any.required": `toUser is a required field`,
  }),
  isFollow: Joi.number().valid(1,0).required()
})