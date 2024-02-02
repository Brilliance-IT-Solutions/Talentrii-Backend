const Joi = require("joi")

const likeSchema = Joi.object({
   challengeId : Joi.number().integer().min(1).required(),
   status:Joi.boolean().required()
})

module.exports = {
    likeSchema
}