const Joi = require("joi")

const userIdSchema = Joi.object({
   userId : Joi.number().integer().min(1).required().messages({
    'number.base': 'userId must be a number',
   })
})

module.exports = {
    userIdSchema
}