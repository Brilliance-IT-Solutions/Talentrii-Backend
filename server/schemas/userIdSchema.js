const Joi = require("joi")

const userIdSchema = Joi.object({
   userId : Joi.number().integer().min(1).required()
})

module.exports = {
    userIdSchema
}