const Joi = require('joi').extend(require('@joi/date'));


const createChallengeSchema = Joi.object({
  title: Joi.string().required().max(100).min(3).messages({
    "string.base": `Title should be string`,
    "string.empty": `Title cannot be an empty field`,
    "any.required": `Title is a required field`,
    "string.min": `Title should have a minimum length of 3`,
    "string.max": `Title characters limit cannnot more than 50`,
  }),
  description: Joi.string().required().max(300).min(4).messages({
    "string.base": `Description should be string`,
    "string.empty": `Description cannot be an empty field`,
    "any.required": `Description is a required field`,
    "string.min": `Description should have a minimum length of 4`,
    "string.max": `Description characters limit cannnot more than 250`,
  }),
  url: Joi.array().items(Joi.object().required()),
  latitude:Joi.number().allow(0),
  longitude:Joi.number().allow(0),
  startDate: Joi.date().utc().allow(null),
  endDate: Joi.date().utc().allow(null),
  startTime:Joi.date().utc().allow(null,""),
  category:Joi.string().valid('Break', 'Joinees').required().messages({
    "string.base": `category should be string`,
    "string.empty": `category cannot be an empty field`,
    "any.required": `category is a required field`,
  }),
  endTime:Joi.date().utc().allow(null),
  location:Joi.string().allow(''),
  privacy:Joi.string().allow(''),
  timerCounter:Joi.string().allow(''),
  units:Joi.string().valid("seconds", "minutes", "hours", "days", "weeks", "months", "years"),
  parentId:Joi.number().allow(null)
});


const getChallengeByUserIdSchema = Joi.object({
  userId:Joi.number().required(),
  type:Joi.string().valid("challenge","saved","accepted").required(),
  page: Joi.number().integer().min(1).required().messages({
    "any.required": `page is a required field`,
  }),  
  pageSize: Joi.number().integer().min(1).required().messages({
    "any.required": `pageSize is a required field`,
  })
  
})

const getChallengeByChallengeIdSchema = Joi.object({
  userId:Joi.number().required(),
  challengeId : Joi.string().required().messages({
    "string.base": `challengeId should be string`,
    "string.empty": `challengeId cannot be an empty field`,
    "any.required": `challengeId is a required field`,
})
})

const editChallengeSchema = Joi.object({
  userId:Joi.number().required(),
  challengeId : Joi.number().integer().min(1).required(),
  title: Joi.string().max(100).min(3),
  description:Joi.string().max(300).min(4)
})


module.exports = {
  createChallengeSchema,
  getChallengeByUserIdSchema,
  getChallengeByChallengeIdSchema,
  editChallengeSchema
}


