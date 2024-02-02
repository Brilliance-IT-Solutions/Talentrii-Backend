const Joi = require("joi")

const searchSchema = Joi.object({
   searchTerm : Joi.string().required().messages({
    "string.base": `searchTerm should be string`,
    "string.empty": `searchTerm cannot be an empty field`,
    "any.required": `searchTerm is a required field`,
   })
})

module.exports = {
    searchSchema
}