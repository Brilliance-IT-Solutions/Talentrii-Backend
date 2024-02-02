const Joi = require("joi");

const addCommentsByChallengeIdSchema = Joi.object({
    challengeId : Joi.number().integer().min(1).required(),
    comments:Joi.string().min(1).required()
})

const getCommentsByChallengeIdSchema = Joi.object({
    challengeId : Joi.number().integer().min(1).required(),
})

module.exports = {
    addCommentsByChallengeIdSchema,
    getCommentsByChallengeIdSchema
}