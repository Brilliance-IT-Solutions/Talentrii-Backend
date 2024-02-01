const Joi = require('joi');

module.exports = Joi.object({
  userId: Joi.string().required().messages({
    "string.base": `userId should be string`,
    "string.empty": `userId cannot be an empty field`,
    "any.required": `userId is a required field`,
  }),
  type: Joi.string().valid('followers', 'following').required().messages({
    "string.base": `type should be string`,
    "string.empty": `type cannot be an empty field`,
    "any.required": `type is a required field`,
    "string.valid":`type is not valid`
  }),
  page: Joi.number().integer().min(1).required().messages({
    "any.required": `page is a required field`,
  }),  
  pageSize: Joi.number().integer().min(1).required().messages({
    "any.required": `pageSize is a required field`,
  })

})