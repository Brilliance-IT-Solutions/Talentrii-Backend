const Joi = require("joi")

const searchSchema = Joi.object({
    userId:Joi.number().required(),
   searchTerm : Joi.string().required().messages({
    "string.base": `searchTerm should be string`,
    "string.empty": `searchTerm cannot be an empty field`,
    "any.required": `searchTerm is a required field`,
   })
})

module.exports = {
    searchSchema
}