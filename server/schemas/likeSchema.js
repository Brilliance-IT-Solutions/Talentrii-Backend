const Joi = require("joi")

const likeSchema = Joi.object({
   challengeId : Joi.number().integer().min(1).required(),
   status:Joi.number().valid(1,0).required()
})

module.exports = {
    likeSchema
}