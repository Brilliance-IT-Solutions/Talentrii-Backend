const Joi = require("joi")

const savedSchema = Joi.object({
   challengeId : Joi.number().integer().min(1).required(),
   saved:Joi.number().valid(1,0).required()
})

module.exports = {
    savedSchema
}