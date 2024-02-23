const Joi = require("joi");

const addCommentsByChallengeIdSchema = Joi.object({
    userId: Joi.number().required(),
    challengeId : Joi.number().integer().min(1).required(),
    comments:Joi.string().min(1).required()
})

const getCommentsByChallengeIdSchema = Joi.object({
    userId: Joi.number().required(),
    challengeId : Joi.number().integer().min(1).required(),
    page: Joi.number().integer().min(1).required().messages({
        "any.required": `page is a required field`,
      }),  
      pageSize: Joi.number().integer().min(1).required().messages({
        "any.required": `pageSize is a required field`,
      })
})

const deleteCommentByIdSchema = Joi.object({
  userId: Joi.number().required(),
  id : Joi.number().integer().min(1).required()
})



module.exports = {
    addCommentsByChallengeIdSchema,
    getCommentsByChallengeIdSchema,
    deleteCommentByIdSchema
}