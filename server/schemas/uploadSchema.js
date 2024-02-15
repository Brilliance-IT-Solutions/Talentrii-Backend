const Joi = require("joi")

const uploadSchema = Joi.object({
   files : Joi.array().items(Joi.object().required()),
   category:Joi.string().valid('challenge','profile').required()
})

module.exports = {
    uploadSchema
}