const Joi = require('joi');

module.exports = Joi.object({
  toUser: Joi.number().integer().min(1).required(),
  isFollow: Joi.number().valid(1,0).required()
})