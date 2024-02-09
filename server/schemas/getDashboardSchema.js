const Joi = require('joi');

const dashboardSchema = Joi.object({
  userId: Joi.number().required(),
  page: Joi.number().integer().min(1).required().messages({
    "any.required": `page is a required field`,
  }),  
  pageSize: Joi.number().integer().min(1).required().messages({
    "any.required": `pageSize is a required field`,
  })

})

module.exports = {
    dashboardSchema
}